import React from "react";
import ReactDOM from "react-dom/client";
import MealRingsApp from "./App";
import "./styles.css"; // Om du använder en extern CSS-fil

// Hitta "root"-elementet i index.html och mounta appen
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <MealRingsApp />
  </React.StrictMode>
);
