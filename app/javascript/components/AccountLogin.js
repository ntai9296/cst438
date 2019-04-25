import React from 'react';
import { Modal, message, Tabs } from 'antd';
import LoginForm from './Account/LoginForm';
import { login, signup } from '../apis/account';
import { setCookie, COOKIES } from '../apis/cookie';
import RegisterForm from './Account/RegisterForm';
import { connect } from 'react-redux';
import { API_URL } from '../constants';
import axios from 'axios';

const TabPane = Tabs.TabPane;

const FORMS = {
  LOGIN: 'Login',
  SIGNUP: 'Sign Up',
  FORGOT_PASSWORD: 'Forgot Password',
};

class AccountLogin extends React.Component {
  state = { form: FORMS.LOGIN };
  handleSubmit = async (emailAddress, password) => {
    try {
      const result = await login(emailAddress, password);

      if (result.data) {
        setCookie(COOKIES.AUTHORIZATION, result.data);
        const userInfo = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: result.data,
          },
        });
        this.props.dispatch({
          type: 'UPDATE_USER',
          user: userInfo.data,
        });
        this.props.onCancel();
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  handleSignUp = async (emailAddress, password) => {
    try {
      const result = await signup(emailAddress, password);

      if (result.data) {
        setCookie(COOKIES.AUTHORIZATION, result.data);
        const userInfo = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: result.data,
          },
        });
        this.props.dispatch({
          type: 'UPDATE_USER',
          user: userInfo.data,
        });
        this.props.onCancel();
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal footer={null} visible={visible} onCancel={onCancel}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={FORMS.LOGIN} key="1">
            <LoginForm onSubmit={this.handleSubmit} />
          </TabPane>
          <TabPane tab={FORMS.SIGNUP} key="2">
            <RegisterForm onSubmit={this.handleSignUp} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default connect()(AccountLogin);
