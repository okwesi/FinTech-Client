import React from 'react';
import { Layout, Button, Avatar, Dropdown, Space, MenuProps } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
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

    const items = [
        {
            label: 'Add Stock',
            key: '0',
            onClick: () => navigate('/stock'),
        },
        {
            label: 'Add Bond',
            key: '1',
            onClick: () => navigate('/bonds'),
        },
        {
            type: 'divider',
        },
        {
            label: 'Account',
            key: '3',
            onClick: () => navigate('/account'),
        },
    ];
    return (
        <>
            <Header style={{ display: 'flex', backgroundColor: 'white', alignItems: 'center', margin: '0' }}>
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

                {true ? (
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
        </>
    );
};

export default AppHeader;
