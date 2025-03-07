import { useState, useCallback } from 'react';
import TodoItem from './TodoItem';
import CreateTodo from './CreateTodo';
import { Todo as TodoType, TodoProps } from '../types';

export default function Todo({ theme, todoList }: TodoProps) {
  const [todos, setTodos] = useState<TodoType[]>(todoList);

  const toggleStatus = useCallback((id: string) => {
    setTodos(todos =>
      todos.map(item =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(todos => todos.filter(item => item.id !== id));
  }, []);

  const addTodo = useCallback((title: string) => {
    setTodos(todos => [{
      id: crypto.randomUUID(),
      title,
      status: false
    }, ...todos]);
  }, []);

  const editTodo = useCallback((id: string, title: string) => {
    setTodos(todos =>
      todos.map(item =>
        item.id === id ? { ...item, title } : item
      )
    );
  }, []);

  return (
    <div className={theme}>
      <CreateTodo addTodo={addTodo} />
      <div role="list" aria-label="Todo list">
        {todos.map(item => (
          <TodoItem 
            key={item.id}
            item={item}
            toggleStatus={toggleStatus}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
}