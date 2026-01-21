import React from 'react';
import { Navigate } from 'react-router-dom';

const SecureRoute = ({ children, type = "protected" }) => {
    const jwt = sessionStorage.getItem('jwt');

    if (type === "protected" && !jwt) {
        return <Navigate to="/" replace />;
    }

    if (type === "public" && jwt) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default SecureRoute;