import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import './styles.less';
import { ITodo } from 'store/todo/models/todo.model';

interface ITodoItemProps {
  todo: ITodo;
  onTodoRemoval: (todo: ITodo) => void;
  onTodoToggle: (todo: ITodo) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  onTodoRemoval,
  onTodoToggle,
}) => {
  const createdDate = new Date(todo.createdDate).toLocaleDateString('en-US');
  const finishedDate = todo.finishDate ? new Date(todo.finishDate).toLocaleDateString('en-US') : '';

  return (
    <List.Item
      actions={[
        <Tooltip
          title={todo.completed ? 'Mark as uncompleted' : 'Mark as completed'}
        >
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={() => onTodoToggle(todo)}
            defaultChecked={todo.completed}
          />
        </Tooltip>,
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => {
            onTodoRemoval(todo);
          }}
        >
          <Button className="remove-todo-button" type="primary" danger>
            X
          </Button>
        </Popconfirm>,
      ]}
      className="list-item"
      key={todo.id}
    >
      <div className="todo-item">
        <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
          {todo.name}
        </Tag>
        <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
          {`Created: ${createdDate}`}
        </Tag>
        {todo.finishDate && (
          <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
          {`Due Date: ${finishedDate}`}
        </Tag>
        )}
      </div>
    </List.Item>
  );
};
