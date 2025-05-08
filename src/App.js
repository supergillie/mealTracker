import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles.css';

const mealGoals = [500, 700, 800]; // Frukost, Lunch, Middag (kalorimål)
const colors = ['#FF3B30', '#FFCC00', '#34C759']; // Rödare rött och Apple-inspirerade färger
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const generateEmptyWeek = () => Array.from({ length: 7 }, () => [0, 0, 0]);

const loadWeekData = () => {
  const storedData = localStorage.getItem('meal-rings-week-data');
  return storedData ? JSON.parse(storedData) : generateEmptyWeek();
};

const saveWeekData = (data) => {
  localStorage.setItem('meal-rings-week-data', JSON.stringify(data));
};

const MealRingsApp = () => {
  const [weekData, setWeekData] = useState(loadWeekData);

  const handleMealClick = (dayIndex, mealIndex) => {
    const updatedWeekData = [...weekData];
    updatedWeekData[dayIndex][mealIndex] = (updatedWeekData[dayIndex][mealIndex] + 1) % 3;
    setWeekData(updatedWeekData);
    saveWeekData(updatedWeekData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl mb-6">Måltidsvy</h1>
      <div className="grid grid-cols-7 gap-2">
        {weekData.map((day, dayIndex) => (
          <div key={dayIndex} className="flex flex-col items-center">
            <div className="text-gray-500 mb-2">{daysOfWeek[dayIndex]}</div>
            <div className="relative w-24 h-24">
              <CircularProgressbarWithChildren
                value={100}
                styles={buildStyles({
                  pathColor: '#333',
                  trailColor: '#333',
                  strokeLinecap: 'round',
                  strokeWidth: 14,
                })}
              >
                {colors.map((color, mealIndex) => (
                  <div
                    key={mealIndex}
                    onClick={() => handleMealClick(dayIndex, mealIndex)}
                    className="absolute inset-0"
                    style={{
                      transform: `scale(${1 - mealIndex * 0.15})`,
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <CircularProgressbarWithChildren
                      value={(weekData[dayIndex][mealIndex] / 2) * 100}
                      styles={buildStyles({
                        pathColor: color,
                        trailColor: 'rgba(255, 255, 255, 0.15)',
                        strokeLinecap: 'round',
                        strokeWidth: 16,
                      })}
                    />
                  </div>
                ))}
              </CircularProgressbarWithChildren>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealRingsApp;
