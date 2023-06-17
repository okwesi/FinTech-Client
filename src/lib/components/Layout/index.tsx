import React from 'react';
import AppHeader from '../AppHeader';
import { Outlet } from 'react-router-dom';

const Layout = () => {
	return (
		<>
			<AppHeader />
			<div style={{ padding: '0 6% ' }}>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
