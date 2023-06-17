import React from 'react';
import AppHeader from '../AppHeader';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<AppHeader />
			<Outlet />
		</>
	);
};

export default Layout;
