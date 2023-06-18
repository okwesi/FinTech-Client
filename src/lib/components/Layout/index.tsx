import React from 'react';
import AppHeader from '../AppHeader';
import { Outlet } from 'react-router-dom';
import colors from '../../../assets/colors';

const Layout = () => {
	return (
		<div style={{ backgroundColor: colors.background }}>
			<AppHeader />
			<div style={{ padding: '0 6% ' }}>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
