import React from 'react';
import { Routes as DefaultRoutes, Navigate, Route } from 'react-router-dom';
import Home from './pages/Home';


const Routes = () => {
    return (
        <DefaultRoutes>
            {/* <Route path="/" element={<Navigate to={'/'} replace />} /> */}
            <Route path="/" element={<Home/>} />
        </DefaultRoutes>
    )
}

export default Routes


