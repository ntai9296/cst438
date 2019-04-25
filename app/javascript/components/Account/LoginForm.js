import React from 'react';
import { Input, Form, Icon, Button } from 'antd';

export default class LoginForm extends React.Component {
  state = { emailAddres: '', password: '' };
  render() {
    const { onSubmit } = this.props;
    const { emailAddress, password } = this.state;
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(emailAddress, password);
        }}
        className="login-form"
      >
        <Form.Item label="Username">
          <Input
            value={emailAddress}
            onChange={(e) => this.setState({ emailAddress: e.target.value })}
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            type="email"
          />
        </Form.Item>
        <Form.Item label="Password">
          <Input
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
