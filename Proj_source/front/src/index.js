import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import Home from './pages/Home';
import VerifyCertification from './pages/VerifyCertification';
import AboutUs from './pages/AboutUs';
import Admin from './pages/Admin';
import CreateMotor from './pages/CreateMotor';
import CreatePump from './pages/CreatePump';

import ElectricEngine from './artifacts/ElectricEngine.json'
import ElectricPump from './artifacts/ElectricPump.json'
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from "@drizzle/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/verifycertification",
    element: <VerifyCertification />,
  },
  {
    path: "/createmotor",
    element: <CreateMotor />,
  },
  {
    path: "/createpump",
    element: <CreatePump />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },

  {
    path: "/admin",
    element: <Admin />,
  },
]);

//Set contract in drizzle option
const drizzleOptions = { contracts: [ElectricEngine, ElectricPump], };
//const { AccountData, ContractData, ContractForm } = newContextComponents;
const drizzle = new Drizzle(drizzleOptions);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;
          if (!initialized) {
            return ""
          }
          return (
            <RouterProvider router={router} drizzle={drizzle} drizzleState={drizzleState} />
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
