/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [validUser, setValidUser] = useState(null);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes validUser={validUser}>
              <HomePage validUser={validUser} setValidUser={setValidUser} />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register validUser={validUser} />} />
        <Route
          path="/login"
          element={<Login validUser={validUser} setValidUser={setValidUser} />}
        />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (props.validUser) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
