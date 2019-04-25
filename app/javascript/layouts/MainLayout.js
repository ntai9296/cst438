import React from 'react';
import {
  Layout,
  Menu,
  Icon,
  Button,
  Dropdown,
  Popover,
  List,
  Modal,
  Form,
  Input,
  message,
} from 'antd';
import { Link } from 'react-router-dom';
import AccountLogin from '../components/AccountLogin';
import { connect } from 'react-redux';
import { removeCookie, COOKIES, getCookie } from '../apis/cookie';
import Axios from 'axios';
import { API_URL } from '../constants';
import { withRouter } from 'react-router-dom';
const { Sider, Content, Header } = Layout;

class MainLayout extends React.Component {
  state = { visible: false, checkout: false, creditCard: '', monthDate: '', cvc: '' };
  async componentDidMount() {
    const authToken = getCookie(COOKIES.AUTHORIZATION);
    if (authToken) {
      const result = await Axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: authToken,
        },
      });
      if (result.data) {
        this.props.dispatch({
          type: 'UPDATE_USER',
          user: result.data,
        });
      }
    }
  }
  toggleCheckout = () => {
    this.setState((prevState) => ({ checkout: !prevState.checkout }));
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  onCheckout = async () => {
    try {
      const result = await Axios.post(
        `${API_URL}/order`,
        {
          items: this.props.cart,
          total: this.props.cart.reduce((acc, item) => (acc += item.price), 0),
        },
        {
          headers: {
            Authorization: getCookie(COOKIES.AUTHORIZATION),
          },
        },
      );
      if (result.data) {
        message.success('Checked out successfully');
        this.props.dispatch({
          type: 'CLEAR_CART',
        });
        this.toggleCheckout();
        return;
      }
      throw new Error('Failed to checkout');
    } catch (err) {
      message.warning(err.message);
    }
  };
  render() {
    const { children, user } = this.props;
    const { visible } = this.state;
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
          <Menu
            onSelect={(i) => this.props.history.push(i.key)}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/']}
            selectedKeys={[this.props.history.location.pathname]}
          >
            <Menu.Item key="/">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="/shop">
              <Icon type="shopping-cart" />
              <span>Shop</span>
            </Menu.Item>
            <Menu.Item key="/services">
              <Icon type="calendar" />
              <span>Service Request</span>
            </Menu.Item>
            <Menu.Item key="/parts">
              <Icon type="tags" />
              <span>Parts Inventory</span>
            </Menu.Item>
            {user && (
              <Menu.Item key="/myservices">
                <Icon type="user" />
                <span>My Service(s)</span>
              </Menu.Item>
            )}
            {user && (
              <Menu.Item key="/orders">
                <Icon type="copy" />
                <span>My Order(s)</span>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <div className="headerContainer">
              <Popover
                content={
                  <div>
                    <List
                      dataSource={this.props.cart}
                      renderItem={(item) => (
                        <List.Item>
                          {item.name} [${item.price}]
                        </List.Item>
                      )}
                    />
                    {this.props.cart.length > 0 && (
                      <React.Fragment>
                        <h2>
                          Total: $
                          {this.props.cart.reduce((acc, item) => (acc += item.price), 0).toFixed(2)}
                        </h2>
                        <Button
                          type="primary"
                          block
                          onClick={() => {
                            if (user) {
                              this.toggleCheckout();
                            } else {
                              this.showModal();
                            }
                          }}
                        >
                          Checkout
                        </Button>
                      </React.Fragment>
                    )}
                  </div>
                }
                trigger="click"
              >
                <Button>{this.props.cart.length} item(s) in cart</Button>
              </Popover>
              {user ? (
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        onClick={() => {
                          this.props.dispatch({
                            type: 'REMOVE_USER',
                          });
                          removeCookie(COOKIES.AUTHORIZATION);
                        }}
                      >
                        <a>Logout</a>
                      </Menu.Item>
                    </Menu>
                  }
                  placement="bottomLeft"
                >
                  <Button>{user.email}</Button>
                </Dropdown>
              ) : (
                <Button onClick={this.showModal}>Login</Button>
              )}
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

            <AccountLogin onCancel={this.handleCancel} visible={visible} />
            <Modal
              onOk={() => this.onCheckout()}
              onCancel={() => this.toggleCheckout()}
              okText="Checkout"
              visible={this.state.checkout}
              title="Checkout"
            >
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.onCheckout();
                }}
                className="login-form"
              >
                <Form.Item label="Credit card number">
                  <Input
                    value={this.state.creditCard}
                    onChange={(e) => this.setState({ creditCard: e.target.value })}
                    maxLength={16}
                  />
                </Form.Item>
                <Form.Item label="Expiration Date (MM/YY)">
                  <Input
                    value={this.state.monthDate}
                    onChange={(e) => this.setState({ monthDate: e.target.value })}
                    maxLength={5}
                  />
                </Form.Item>
                <Form.Item label="CVC">
                  <Input
                    value={this.state.cvc}
                    onChange={(e) => this.setState({ cvc: e.target.value })}
                    maxLength={3}
                  />
                </Form.Item>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect((props) => ({ user: props.user, cart: props.cart }))(MainLayout));
