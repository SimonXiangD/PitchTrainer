import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Content } = Layout;
const items = new Array(5).fill(null).map((_, index) => ({
    key: index + 1,
    label: `nav ${index + 1}`,
}));
const navItems = [
    {
        key: 1,
        label: <Link to="/"> Home </Link>
    },
    {
        key: 2,
        label: <Link to="/train"> Train </Link>
    },
    {
        key: 3,
        label: <Link to="/listen"> Listen </Link>
    },
    {
        key: 4,
        label: <Link to="/play"> Play </Link>
    },
    {
        key: 5,
        label: <Link to="/about"> About </Link>
    },
]
const HeaderComponent = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={navItems}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />
            </Header>

        </Layout>
    );
};
export default HeaderComponent;