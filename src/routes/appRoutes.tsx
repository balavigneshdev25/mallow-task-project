import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UsersPage from "../pages/usersPage";
import Login from "../pages/login";
import ProtectedRoute from "../components/protectRoute";
import SecondPage from "../pages/page2";
import ThirdPage from "../pages/page3";
import FourthPage from "../pages/page4";
import ForgotPassword from "../pages/forgotpassword";

const AppRoutes: React.FC = () => {

  useEffect(()=>{
    document.title = "User List";
  },[])

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/users_list" element={<UsersPage />} />
          <Route path="/page2" element={<SecondPage />} />
          <Route path="/page3" element={<ThirdPage />} />
          <Route path="/page4" element={<FourthPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
