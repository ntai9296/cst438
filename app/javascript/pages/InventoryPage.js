import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class InventoryPage extends React.Component {
  render() {
    return (
      <MainLayout>
        <Link to="/">
          <Button>To Home Page</Button>
        </Link>
      </MainLayout>
    );
  }
}

export default InventoryPage;
