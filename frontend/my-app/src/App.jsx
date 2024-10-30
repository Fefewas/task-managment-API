import React from "react";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext"; 
import ProtectedRoute from "./components/home/ProtectedRoute"; 

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />}>
              <Route index element={<AllTasks />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute>
                    <AllTasks />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;
