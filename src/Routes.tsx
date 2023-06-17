import React from 'react';
import { Routes as DefaultRoutes, Route } from 'react-router-dom';
import Home from './pages/Home';


const Routes = () => {
    return (
        <DefaultRoutes>
            <Route path="/home" element={<Home/>} />
        </DefaultRoutes>
    )
}

export default Routes


