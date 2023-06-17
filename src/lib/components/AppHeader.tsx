import React from 'react';
import { Layout, Menu, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader: React.FC = () => {
    return (
        <>
        <Header style={{ display: 'flex', backgroundColor: 'white', alignItems: "center", margin: '0' }}>
            <img src='https://assets-global.website-files.com/5ee9ebae123fc9271144103a/61c3d870e8d7277e2a318ebc_logo%20a%208center.png' alt='Google' style={{ width: '70', height: '30px', marginRight: '50px' }} />
            <div>
                {/* Your custom menu items */}
                <Button type="text">Text Button</Button>
                <Button type="text">Text Button</Button>
                <Button type="text">Text Button</Button>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} />
                <span style={{ marginLeft: '10px', color: 'green' }}>Username</span>
            </div>
        </Header>
            <img src='https://images.ctfassets.net/6ndujxh3wgyb/6NwlZ5M6qNPq0oyUXcG0Zs/f136a24762389b14bccf9f8e80e7e357/the-future-of-fintech-header.jpg' alt='Google' style={{ width: '100%', height: '85vh', marginRight: '50px' }} />
        </>
    );
};

export default AppHeader;
