import React from 'react';
import { Layout, Button, Avatar, Dropdown, Space, MenuProps } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import AddBondModal from '../Modals/AddBondModal';
import AddStockModal from '../Modals/AddStockModal';
import { useAuthenticationState } from '../../../store/selector';
import { useDispatch } from 'react-redux';
import authenticationAsyncActions from '../../../store/authentication/authentication.thunk';

const { Header } = Layout;

const AppHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch<any>();

	const [openBond, setBondOpen] = React.useState(false);
	const [openStock, setStockOpen] = React.useState(false);

	const authenticationState = useAuthenticationState();

	const isAuth = authenticationState.isAuthenticated;

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

	const signOut = () => {
        console.log('signout')
		dispatch(authenticationAsyncActions.signOut());
		navigate('/');
	};
	const items: MenuProps = [
		{
			label: 'Add Stock',
			key: '0',
			onClick: () => setStockOpen(true),
		},
		{
			label: 'Add Bond',
			key: '1',
			onClick: () => setBondOpen(true),
		},
		{
			type: 'divider',
		},
		{
			label: 'Account',
			key: '3',
			onClick: () => navigate('/account'),
		},
		{
			type: 'divider',
		},
		{
			label: 'Sign Out',
			key: '4',
			onClick: () => signOut(),
		},
	];
	return (
		<>
			<Header
				style={{ display: 'flex', backgroundColor: 'transparent', alignItems: 'center', marginBottom: '20px' }}
			>
				<img
					src="https://assets-global.website-files.com/5ee9ebae123fc9271144103a/61c3d870e8d7277e2a318ebc_logo%20a%208center.png"
					alt="Google"
					style={{ width: '70px', height: '30px', marginRight: '50px' }}
				/>
				<div>
					<Button type="text" onClick={handleHome}>
						Home
					</Button>
					<Button onClick={handleStock} type="text">
						Stocks
					</Button>
					<Button type="text" onClick={handleBonds}>
						Bonds
					</Button>
				</div>
				<div style={{ flex: 1 }} />

				{isAuth ? (
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<Avatar icon={<UserOutlined />} />
						<Dropdown menu={{ items }} trigger={['click']}>
							<a onClick={(e) => e.preventDefault()}>
								<Space>
									Username
									<DownOutlined />
								</Space>
							</a>
						</Dropdown>
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
			<AddBondModal open={openBond} handleClose={() => setBondOpen(false)} />
			<AddStockModal open={openStock} handleClose={() => setStockOpen(false)} />
		</>
	);
};

export default AppHeader;
