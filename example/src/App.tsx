import React from "react";
import { LaunchProvider } from "launch.io";
import Main from "./views/Main";
import nameService from "./features/name/name.service";
import calculatorService from "./features/calculator/calculator.service";
import "./App.css";

export default function App() {
  return (
    <LaunchProvider
      services={[nameService, calculatorService]}
      options={{ enableTimeTravel: true }}
    >
      <div className="App">
        <header className="App-header">
          <img className="Logo" src="logo-small.png" alt="Launch.IO"></img>
          <Main />
        </header>
      </div>
    </LaunchProvider>
  );
}
