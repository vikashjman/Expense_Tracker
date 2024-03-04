// utils/PrivateRoute.js
import React from 'react';
import { useUser } from '../contexts/user.context';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ path, children }) => {
    const { user } = useUser();

    return (
        <Route path={path} render={user ? children : <Navigate to="/login" />} />
    );
};

export default PrivateRoute;