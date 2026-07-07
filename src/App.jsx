//App.jsx decides what page the user should see

//React Router enables client-side navigation between different pages of a React application without reloading the browser
//BrowserRouter: Enables routing and monitors the browser's URL.
//Routes: Holds all the route definitions and matches the current URL.
//Route: Maps a specific URL path to a React component.
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Results from "./pages/Results";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />

        <Route
          path="/results"
          element={<Results />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;