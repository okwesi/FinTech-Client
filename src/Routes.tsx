import React from 'react';
import { Routes as DefaultRoutes, Navigate, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Layout from './lib/components/Layout';
import SignUpPage from './pages/SignUpPage';
import SignnPage from './pages/SignInPage';
import StockPage from './pages/StockPage';
import BondsPage from './pages/BondsPage';

const Routes = () => {
	return (
		<DefaultRoutes>
			{/* <Route path="/" element={<Navigate to={'/'} replace />} /> */}
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/signin" element={<SignnPage />} />
			<Route path="/" element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/stock" element={<StockPage />} />
				<Route path="/bonds" element={<BondsPage />} />
			</Route>
		</DefaultRoutes>
	);
};

export default Routes;
