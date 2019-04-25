import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Collapse, Icon, message, List } from 'antd';
import Axios from 'axios';
import { API_URL } from '../constants';
import { getCookie, COOKIES } from '../apis/cookie';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

export default class MyOrderPage extends React.Component {
  state = {
    orders: [],
    keys: [],
    items: {},
  };
  async componentDidMount() {
    try {
      const result = await Axios.get(`${API_URL}/orders`, {
        headers: {
          Authorization: getCookie(COOKIES.AUTHORIZATION),
        },
      });
      if (result.data) {
        this.setState({ orders: result.data });
      } else {
        throw new Error('failed to fetch orders');
      }
    } catch (error) {
      message.warning(error.message);
    }
  }
  onOpenOrder = async (data) => {
    this.setState({ keys: data });
    data
      .filter((key) => !this.state.items[key])
      .map(async (key) => {
        const result = await Axios.get(`${API_URL}/orderitems/${key}`, {
          headers: {
            Authorization: getCookie(COOKIES.AUTHORIZATION),
          },
        });
        if (result.data) {
          this.setState((prevState) => ({ items: { ...prevState.items, [key]: result.data }}))
        }
      });
  };
  render() {
    return (
      <MainLayout>
        <h1>My Order(s)</h1>
        <Collapse
          onChange={(data) => this.onOpenOrder(data)}
          bordered={false}
          defaultActiveKey={[]}
          activeKey={this.state.keys}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          {this.state.orders.map((order) => (
            <Panel
              header={`Order #${order.id} - Total $${order.total.toFixed(2)}`}
              key={order.id}
              style={customPanelStyle}
            >
              <List dataSource={this.state.items[order.id] || []} renderItem={(item) => <List.Item>
                  {item.name} - [${item.price.toFixed(2)}]
              </List.Item>} />
            </Panel>
          ))}
        </Collapse>
      </MainLayout>
    );
  }
}
