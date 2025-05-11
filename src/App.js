import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles.css';

const mealGoals = [500, 700, 800];
const colors = ['#34C759', '#FFCC00', '#FF3B30'];
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateEmptyWeek = () => Array.from({ length: 7 }, () => [0, 0, 0]);

const loadWeekData = () => {
  const storedData = localStorage.getItem('meal-rings-week-data');
  return storedData ? JSON.parse(storedData) : generateEmptyWeek();
};

const saveWeekData = (data) => {
  localStorage.setItem('meal-rings-week-data', JSON.stringify(data));
};

const getCurrentDayIndex = () => {
  const today = new Date();
  const dayIndex = today.getDay() - 1;
  return dayIndex < 0 ? 6 : dayIndex;
};

const MealRingsApp = () => {
  const [weekData, setWeekData] = useState(loadWeekData);
  const [currentDayIndex, setCurrentDayIndex] = useState(getCurrentDayIndex());

  const handleMealClick = (dayIndex, mealIndex) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex][mealIndex] = (updatedWeekData[dayIndex][mealIndex] + 1) % 3;
    setWeekData(updatedWeekData);
    saveWeekData(updatedWeekData);
  };

  const handleTodayMealClick = (mealIndex) => {
    handleMealClick(currentDayIndex, mealIndex);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl mb-4">
        MealTracker <span className="text-sm">0.1</span>
      </h1>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-4 mb-8">
        {weekData.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col items-center">
            <div className="text-gray-500 mb-2">{daysOfWeek[dayIndex]}</div>
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 cursor-pointer" onClick={() => handleMealClick(dayIndex, 0)}>
                <CircularProgressbarWithChildren
                  value={(day[0] / 2) * 100}
                  styles={buildStyles({
                    pathColor: colors[0],
                    trailColor: 'rgba(255, 255, 255, 0.15)',
                    strokeLinecap: 'round',
                    strokeWidth: 16,
                  })}
                />
              </div>
              <div className="absolute inset-0 cursor-pointer" onClick={() => handleMealClick(dayIndex, 1)} style={{ transform: 'scale(0.85)' }}>
                <CircularProgressbarWithChildren
                  value={(day[1] / 2) * 100}
                  styles={buildStyles({
                    pathColor: colors[1],
                    trailColor: 'rgba(255, 255, 255, 0.15)',
                    strokeLinecap: 'round',
                    strokeWidth: 16,
                  })}
                />
              </div>
              <div className="absolute inset-0 cursor-pointer" onClick={() => handleMealClick(dayIndex, 2)} style={{ transform: 'scale(0.7)' }}>
                <CircularProgressbarWithChildren
                  value={(day[2] / 2) * 100}
                  styles={buildStyles({
                    pathColor: colors[2],
                    trailColor: 'rgba(255, 255, 255, 0.15)',
                    strokeLinecap: 'round',
                    strokeWidth: 16,
                  })}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Meal Buttons */}
      <div className="button-container">
        <button onClick={() => handleTodayMealClick(0)} className="meal-button bg-green-500">Breakfast / Break</button>
        <button onClick={() => handleTodayMealClick(1)} className="meal-button bg-yellow-500">Lunch / Break</button>
        <button onClick={() => handleTodayMealClick(2)} className="meal-button bg-red-500">Dinner / Break</button>
      </div>
    </div>
  );
};

export default MealRingsApp;
