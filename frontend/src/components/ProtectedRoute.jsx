// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // No token → redirect to login
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
 