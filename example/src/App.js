import React from "react";
import { LaunchProvider, createServiceApi } from "launch.io";
import Main from "./views/Main";
import services from "./services";
import "./App.css";

export default function App() {
  return (
    <LaunchProvider
      serviceApi={createServiceApi(services, { enableTimeTravel: true })}
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
