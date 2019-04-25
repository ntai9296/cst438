import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Card, Col, Row, Icon, message, Avatar } from 'antd';
import axios from 'axios';
import { API_URL } from '../constants';
import { connect } from 'react-redux';

class ShopPage extends React.Component {
  state = {
    items: [],
    loading: true,
  };
  async componentDidMount() {
    const result = await axios.get(`${API_URL}/items`);
    this.setState({ items: result.data, loading: false });
  }
  render() {
    const { items, loading } = this.state;
    return (
      <MainLayout>
        <h1 className="shopHeading">Check our shop</h1>

        {loading && (
          <div>
            <Card style={{ width: '33%', marginTop: 16 }} loading={loading} />
            <Card style={{ width: '33%', marginTop: 16 }} loading={loading} />
            <Card style={{ width: '33%', marginTop: 16 }} loading={loading} />
          </div>
        )}

        {items.length === 0 && <h1 className="text-center">We're sold out :(</h1>}

        <Row gutter={16}>
          {items.map((item, idx) => (
            <Col span={8} key={idx}>
              <Card
                style={{ marginBottom: '1rem' }}
                cover={<img src={item.image} />}
                actions={[
                  <Icon
                    onClick={() => {
                      this.props.dispatch({
                        type: 'ADD_ITEM',
                        item: item,
                      });
                      message.success('Item added into cart');
                    }}
                    type="shopping-cart"
                  />,
                ]}
              >
                <Card.Meta title={item.name} description={item.description} />
                <h2>
                  ${item.price} ({item.quantity}) left
                </h2>
              </Card>
            </Col>
          ))}
        </Row>
      </MainLayout>
    );
  }
}

export default connect()(ShopPage);
