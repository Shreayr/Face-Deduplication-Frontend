//main.jsx starts React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";//ReactDOM connects React with the actual webpage (the browser's DOM).
import "./index.css"; //global CSS
import App from "./App.jsx";
//StrictMode is a development tool that helps detect potential bugs, deprecated features, and unsafe code
createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <App />
  </StrictMode>
);