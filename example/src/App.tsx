import React from "react";
import { useLaunchProvider } from "launch.io";
import Main from "./views/Main";
import nameService from "./features/name/name.service";
import calculatorService from "./features/calculator/calculator.service";
import "./App.css";

const services = [nameService, calculatorService];
const options = { enableTimeTravel: true };
export default function App() {
  useLaunchProvider(services, options);
  console.log("RENDERING APP");
  return (
    <div className="App">
      <header className="App-header">
        <img className="Logo" src="logo-small.png" alt="Launch.IO"></img>
        <Main />
      </header>
    </div>
  );
}
