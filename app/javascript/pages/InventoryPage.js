import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { Table, Divider, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import Axios from 'axios';
import { API_URL } from '../constants';

class InventoryPage extends React.Component {
  state = {
    items: [],
    addModal: false,
  };
  componentDidMount() {
    this.onFetchItems();
  }
  async onFetchItems() {
    const result = await Axios.get(`${API_URL}/items_all`);

    if (result.data) {
      this.setState({ items: result.data });
    }
  }
  onToggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  };
  onAddItem = async () => {
    try {
      const result = await Axios.post(`${API_URL}/item`, {
        image: this.state.image,
        name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity,
        description: this.state.description,
      });
      console.log(result);
      if (result.data) {
        message.success('Item added');
        await this.onFetchItems();
        this.onToggleAddModal();
        this.setState({
          image: '',
          name: '',
          price: 0,
          quantity: 0,
          description: '',
        });
      } else {
        throw new Error('Failed to add item');
      }
    } catch (err) {
      message.warning(err.message);
    }
  };
  onDelete = async (id) => {
    try {
      await Axios.delete(`${API_URL}/item/${id}`);
      await this.onFetchItems();
      message.success('Deleted');
    } catch (err) {
      message.warning(err.message);
    }
  };
  onEdit = async () => {
    try {
      await Axios.put(`${API_URL}/item`, {
        id: this.state.id,
        image: this.state.image,
        name: this.state.name,
        price: this.state.price,
        quantity: this.state.quantity,
        description: this.state.description,
      });
      await this.onFetchItems();
      message.success('Done!')
      this.setState({
        id: '',
        image: '',
        name: '',
        price: 0,
        quantity: 0,
        description: '',
        editModal: false,
      });
    } catch (err) {
      message.warning(err.message);
    }
  };
  onToggleEditModal = () => {
    this.setState({ editModal: !this.state.editModal });
  }
  render() {
    return (
      <MainLayout>
        <Button onClick={this.onToggleAddModal} block type="primary">
          Add Item
        </Button>
        <Modal
          onCancel={this.onToggleAddModal}
          onOk={() => this.onAddItem()}
          visible={this.state.addModal}
          title="Add Item"
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              this.onAddItem();
            }}
            className="login-form"
          >
            <Form.Item label="Image">
              <Input
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Name">
              <Input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Price">
              <InputNumber value={this.state.price} onChange={(e) => this.setState({ price: e })} />
            </Form.Item>

            <Form.Item label="Quantity">
              <InputNumber
                value={this.state.quantity}
                onChange={(e) => this.setState({ quantity: e })}
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          onCancel={this.onToggleEditModal}
          onOk={() => this.onEdit()}
          visible={this.state.editModal}
          title="Edit Item"
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              this.onEdit();
            }}
            className="login-form"
          >
            <Form.Item label="Image">
              <Input
                value={this.state.image}
                onChange={(e) => this.setState({ image: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Name">
              <Input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Price">
              <InputNumber value={this.state.price} onChange={(e) => this.setState({ price: e })} />
            </Form.Item>

            <Form.Item label="Quantity">
              <InputNumber
                value={this.state.quantity}
                onChange={(e) => this.setState({ quantity: e })}
              />
            </Form.Item>

            <Form.Item label="Description">
              <Input.TextArea
                value={this.state.description}
                onChange={(e) => this.setState({ description: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>
        <div>
          <Table
            rowKey="id"
            columns={[
              {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
              },
              {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
                render: (image) => <img width={50} height={50} src={image} />,
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
              },
              {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
              },
              {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a onClick={() => {
                      this.setState({
                        editModal: true,
                        id: record.id,
                        image: record.image,
                        name: record.name,
                        price: record.price,
                        quantity: record.quantity,
                        description: record.description,
                      });
                    }}>Edit</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.onDelete(record.id)}>Delete</a>
                  </span>
                ),
              },
            ]}
            dataSource={this.state.items}
          />
        </div>
      </MainLayout>
    );
  }
}

export default InventoryPage;
