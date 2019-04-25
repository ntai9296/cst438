import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Select, DatePicker, TimePicker, Button, message } from 'antd';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../constants';
import { COOKIES, getCookie } from '../apis/cookie';
const Option = Select.Option;

class ServicePage extends React.Component {
  state = {
    serviceType: '',
  };
  onBook = async () => {
    try {
      await Axios.post(
        `${API_URL}/service`,
        {
          serviceType: this.state.serviceType,
          time: this.state.time,
          date: this.state.date,
        },
        {
          headers: {
            Authorization: getCookie(COOKIES.AUTHORIZATION),
          },
        },
      );
      message.success('Service Booked');
    } catch (err) {
      message.warning(err.message);
    }
  };
  render() {
    return (
      <MainLayout>
        <h1 className="text-center">Book a service</h1>
        {this.props.user ? (
          <React.Fragment>
            <Select
              onChange={(e) => this.setState({ serviceType: e })}
              value={this.state.serviceType}
              defaultValue=""
            >
              <Option value="">Service Type</Option>
              <Option value="oil&filter">Oil and filter change</Option>
              <Option value="airfilter">New air filter</Option>
              <Option value="brakes&wheels">Brakes and wheels check</Option>
              <Option value="leaks&wear&damage">Leaks, wear and damage</Option>
            </Select>
            <DatePicker value={this.state.date} onChange={(e) => this.setState({ date: e })} />
            <TimePicker
              value={this.state.time}
              onChange={(e) => this.setState({ time: e })}
              use12Hours
            />
            <Button onClick={this.onBook} type="primary">
              Book now!
            </Button>
          </React.Fragment>
        ) : (
          <p className="text-center">Login to book a service</p>
        )}
      </MainLayout>
    );
  }
}

export default connect((props) => ({ user: props.user }))(ServicePage);
