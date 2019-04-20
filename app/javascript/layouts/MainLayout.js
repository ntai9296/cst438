import React from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Sider, Content, Header } = Layout;

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider>
          <div
            style={{
              height: '32px',
              background: 'rgba(255,255,255,.2)',
              margin: '16px',
            }}
          />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="shopping-cart" />
              <span>Shop</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="calendar" />
              <span>Service Request</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="tags" />
              <span>Parts Inventory</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="info-circle" />
              <span>Vendor Info</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="user" />
              <span>My Account</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="copy" />
              <span>My Order(s)</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="headerContainer">
              <Button>Login</Button>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
