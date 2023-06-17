import React from 'react';
import { Layout, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isActive = (path: any) => {
		return location.pathname === path;
	};
	const handleSignUp = () => {
		navigate('/signup');
	};

	const handleSignIn = () => {
		navigate('/signin');
	};

	const handleStock = () => {
		navigate('/stock');
	};

	const handleBonds = () => {
		navigate('/bonds');
	};
	const handleHome = () => {
		navigate('/');
	};

	return (
		<>
			<Header style={{ display: 'flex', backgroundColor: 'white', alignItems: 'center', margin: '0' }}>
				<img
					src="https://assets-global.website-files.com/5ee9ebae123fc9271144103a/61c3d870e8d7277e2a318ebc_logo%20a%208center.png"
					alt="Google"
					style={{ width: '70px', height: '30px', marginRight: '50px' }}
				/>
				<div>
					<Button type="text" className={isActive('/') ? 'active' : ''} onClick={handleHome}>
						Home
					</Button>
					<Button onClick={handleStock} type="text" className={isActive('/about') ? 'active' : ''}>
						Stocks
					</Button>
					<Button type="text" className={isActive('/bonds') ? 'active' : ''} onClick={handleBonds}>
						Bonds
					</Button>
				</div>
				<div style={{ flex: 1 }} />

				{false ? (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Avatar icon={<UserOutlined />} />
						<span style={{ marginLeft: '10px', color: 'green' }}>Username</span>
					</div>
				) : (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Button type="primary" onClick={handleSignUp}>
							Sign Up
						</Button>
						<Button onClick={handleSignIn}>Sign In</Button>
					</div>
				)}
			</Header>
		</>
	);
};

export default AppHeader;
