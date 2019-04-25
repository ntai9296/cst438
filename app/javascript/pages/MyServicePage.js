import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Collapse, Icon, message, Button } from 'antd';
import Axios from 'axios';
import { API_URL } from '../constants';
import { getCookie, COOKIES } from '../apis/cookie';

const Panel = Collapse.Panel;

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

export default class MyServicePage extends React.Component {
  state = {
    services: [],
  };
  componentDidMount() {
    this.fetchServices();
  }
  fetchServices = async () => {
    try {
      const result = await Axios.get(`${API_URL}/services`, {
        headers: {
          Authorization: getCookie(COOKIES.AUTHORIZATION),
        },
      });
      if (result.data) {
        this.setState({ services: result.data });
      } else {
        throw new Error('failed to fetch services');
      }
    } catch (error) {
      message.warning(error.message);
    }
  };
  onCancel = async (id) => {
    try {
      const result = await Axios.delete(`${API_URL}/service/${id}`, {
        headers: {
          Authorization: getCookie(COOKIES.AUTHORIZATION),
        },
      });
      if (result.data) {
        message.success('Service cancelled');
        await this.fetchServices();
      } else {
        throw new Error('failed to fetch services');
      }
    } catch (error) {
      message.warning(error.message);
    }
  };
  render() {
    return (
      <MainLayout>
        <h1>My Service(s)</h1>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          {this.state.services.map((service) => (
            <Panel
              header={`Service #${service.id} - Type ${service.serviceType}`}
              key={service.id}
              style={customPanelStyle}
            >
              <h1>Date: {new Date(service.date).toDateString()}</h1>
              <h1>Time: {new Date(service.time).toTimeString()}</h1>
              <Button onClick={() => this.onCancel(service.id)} type="danger">
                Cancel
              </Button>
            </Panel>
          ))}
        </Collapse>
      </MainLayout>
    );
  }
}
