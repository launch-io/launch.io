import React from "react";
import { Provider as LibraryProvider, createServiceApi } from "launch.io";
import Main from "./views/Main";
import services from "./services";
import "./App.css";

export default function App() {
  return (
    <LibraryProvider
      serviceApi={createServiceApi(services, { enableTimeTravel: true })}
    >
      <div className="App">
        <header className="App-header">
          <h2>Launch.IO Example</h2>
          <Main />
        </header>
      </div>
    </LibraryProvider>
  );
}
