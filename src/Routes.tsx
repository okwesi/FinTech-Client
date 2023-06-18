import React from 'react';
import { Routes as DefaultRoutes, Navigate, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Layout from './lib/components/Layout';
import SignUpPage from './pages/SignUpPage';
import SignnPage from './pages/SignInPage';
import StockPage from './pages/StockPage';
import BondsPage from './pages/BondsPage';
import StockDetailPage from './pages/StockDetailPage';
import BondDetailPage from './pages/BondDetailPage';
import RapidStocksPage from './pages/RapidStocksPage';

const Routes = () => {
	return (
		<DefaultRoutes>
			{/* <Route path="/" element={<Navigate to={'/'} replace />} /> */}
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/signin" element={<SignnPage />} />
			<Route path="/" element={<Layout />}>
				<Route path="/stock" element={<StockPage />} />
				<Route path="/stock/:id" element={<StockDetailPage />} />
				<Route path="/bonds" element={<BondsPage />} />
				<Route path="/bonds/:id" element={<BondDetailPage />} />
				<Route path="/stocks" element={<RapidStocksPage />} />
			</Route>
			<Route path="*" element={<Navigate to={'/'} replace />} />
		</DefaultRoutes>
	);
};

export default Routes;
