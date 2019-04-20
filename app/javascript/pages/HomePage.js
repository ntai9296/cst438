import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <MainLayout>
        <Link to="/hey">
          <Button>To Hey</Button>
        </Link>
      </MainLayout>
    );
  }
}

export default HomePage;
