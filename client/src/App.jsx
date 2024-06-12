/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  const validUser = useSelector((state) => state.authSlice.validUser);

  if (validUser) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
