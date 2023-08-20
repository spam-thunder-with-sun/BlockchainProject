import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';


import './index.css';

import App from './App';
import Home from './pages/Home';
import VerifyCertification from './pages/VerifyCertification';
import AboutUs from './pages/AboutUs';
import Admin from './pages/Admin';
import CreateMotor from './pages/CreateMotor';
import CreatePump from './pages/CreatePump';

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
  {
    path: "/old",
    element: <App />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
