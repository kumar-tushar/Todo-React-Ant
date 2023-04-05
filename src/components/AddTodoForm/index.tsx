import React from 'react';
import { Form, Row, Col, Button, Input, DatePicker } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';


import './styles.less';
import { ITodo } from 'store/todo/models/todo.model';

interface IAddTodoFormProps {
  onFormSubmit: (todo: ITodo) => void;
}

export const AddTodoForm: React.FC<IAddTodoFormProps> = ({ onFormSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    onFormSubmit({
      name: form.getFieldValue('name'),
      createdDate: form.getFieldValue('createdDate'),
      finishDate: form.getFieldValue('finishDate'),
    });
  
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      className="todo-form"
    >
      <Row gutter={20}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form.Item
            name={'name'}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input placeholder="What needs to be done?" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Form.Item
            name={'createdDate'}
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <DatePicker placeholder="Created Date" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
        <Form.Item
          name={'finishDate'}
          rules={[ { required: true, message: 'This field is required' },
                   ({ getFieldValue }) => ({
                    validator(_, finishDate) {
                      if (!finishDate || !getFieldValue('createdDate')) {
                        return Promise.resolve();
                      }
                      if (finishDate.isSameOrAfter(getFieldValue('createdDate'))) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Finish date must be after creation date'));
                  },
              }),
            ]}
            >
  <DatePicker placeholder="Due Date" />
</Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Button type="primary" htmlType="submit" block>
            <PlusCircleFilled />
            Add todo
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
