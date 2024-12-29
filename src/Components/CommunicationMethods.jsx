import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Checkbox, message } from "antd";
import DataTable from "./DataTable";

const defaultMethods = [
  {
    id: 1,
    name: "LinkedIn Post",
    description: "Post on LinkedIn to connect.",
    sequence: 1,
    mandatory: true,
  },
  {
    id: 2,
    name: "LinkedIn Message",
    description: "Send a message via LinkedIn.",
    sequence: 2,
    mandatory: true,
  },
  {
    id: 3,
    name: "Email",
    description: "Send an email to the contact.",
    sequence: 3,
    mandatory: true,
  },
  {
    id: 4,
    name: "Phone Call",
    description: "Call the contact directly.",
    sequence: 4,
    mandatory: true,
  },
  {
    id: 5,
    name: "Other",
    description: "Other forms of communication.",
    sequence: 5,
    mandatory: false,
  },
];

const CommunicationMethods = () => {
  const [methods, setMethods] = useState(defaultMethods);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [form] = Form.useForm();

  const openModal = (method = null) => {
    setEditingMethod(method);
    if (method) {
      form.setFieldsValue(method);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMethod(null);
    form.resetFields();
  };

  const handleSave = (values) => {
    if (editingMethod) {
      // Update existing method
      setMethods((prevMethods) =>
        prevMethods.map((method) =>
          method.id === editingMethod.id ? { ...method, ...values } : method
        )
      );
      message.success("Communication method updated successfully!");
    } else {
      // Add new method
      setMethods((prevMethods) => [
        ...prevMethods,
        { ...values, id: Date.now(), sequence: prevMethods.length + 1 },
      ]);
      message.success("Communication method added successfully!");
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setMethods((prevMethods) => prevMethods.filter((method) => method.id !== id));
    message.success("Communication method deleted successfully!");
  };

  const columns = [
    {
      title: "Sequence",
      dataIndex: "sequence",
      key: "sequence",
      sorter: (a, b) => a.sequence - b.sequence,
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.sequence - b.sequence,
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.sequence - b.sequence,
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
    {
      title: "Mandatory",
      dataIndex: "mandatory",
      key: "mandatory",
      sorter: (a, b) => a.sequence - b.sequence,
      render: (mandatory) => (mandatory ? "Yes" : "No"),
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            onClick={() => openModal(record)}
            type="primary"
            style={{ backgroundColor: 'green', borderColor: 'green' }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger type="primary">
            Delete
          </Button>
        </div>
      ),
      onHeaderCell: () => ({
        style: { backgroundColor: 'rgb(209 213 219 / var(--tw-bg-opacity, 1))',  fontWeight: 'semi-bold' },
      }),
    },
  ];
  

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
        <div className="float-right">
            <Button
                type="primary"
                onClick={() => openModal()}
                className='font-semibold mb-4'

            >
                Add Communication Method
            </Button>
        </div>
      <Table dataSource={methods} columns={columns} rowKey="id" pagination={true} />
      {/* <DataTable dataSource={methods} columns={columns} rowKey="id" pagination={false} /> */}
      
      {/* Modal for Adding/Editing Methods */}
      <Modal
        title={editingMethod ? "Edit Communication Method" : "Add Communication Method"}
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={() => form.submit()}
        okText="Save"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name." }]}
          >
            <Input placeholder="Enter method name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description." }]}
          >
            <Input.TextArea rows={2} placeholder="Enter method description" />
          </Form.Item>
          <Form.Item
            name="mandatory"
            valuePropName="checked"
            label="Mandatory"
          >
            <Checkbox>Is this method mandatory?</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CommunicationMethods;
