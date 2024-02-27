import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { defaultJobs } from "../constants/constants";
import useJobStore from "../store/jobStore";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const AddJobModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addJob = useJobStore((state) => state.addJob);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="default" onClick={showModal} style={{ marginLeft: 20 }}>
        Add Job +
      </Button>
      <Modal
        title="Add Job"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        styles={{ header: { textAlign: "center", marginBottom: 20 } }}
      >
        <Form
          {...formItemLayout}
          form={form}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="jobTitle"
            label="Job Title"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Section"
            name="section"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select>
              {Object.entries(defaultJobs).map(([key, value]) => (
                <Select.Option value={key}>{value.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Paste or Type the Job Description" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={async () => {
                try {
                  await form.validateFields();
                  addJob({
                    ...form.getFieldsValue(),
                    id: new Date().getMilliseconds().toString(),
                  });
                  handleCancel();
                } catch (err) {}
              }}
            >
              Submit
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddJobModal;
