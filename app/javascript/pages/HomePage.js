import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <MainLayout>
        <h1 className="text-center">Welcome to Elite Auto Repair Shop!</h1>
        <p className="text-center">You can buy parts and request a service with us.</p>
        <img src="https://eliteautorepairtempe.com/Files/Images/slideshow/elite-auto-repair-slide-mobile.jpg" />
        <div className="homeCallToActionDiv">
          <Link to="/shop">
            <Button size="large" type="primary">Shop</Button>
          </Link>
          <Link to="/services">
            <Button size="large" type="primary">Request Service</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
}

export default HomePage;
