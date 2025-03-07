import React, { useRef, useState, useId, useEffect, memo } from 'react';
import { TodoItemProps } from '../types';
import useLogger from './useLogger';

const TodoItem = memo(function TodoItem({
  item,
  toggleStatus,
  editTodo,
  deleteTodo
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(item.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useLogger('Rendering <TodoItem />', 'info');

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    if (inputValue.trim()) {
      editTodo(id, inputValue);
      setIsEditing(false);
    }
  }

  return (
    <div role="listitem" className="todo-item">
      {isEditing ? (
        <form 
          className='edit-todo' 
          onSubmit={(e) => handleSubmit(e, item.id)}
        >
          <label htmlFor={inputId + '-edit'}>
            <span className="sr-only">Edit todo title</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id={inputId + '-edit'}
              required
            />
          </label>
          <button type='submit'>Update</button>
        </form>
      ) : (
        <>
          <input 
            type='checkbox' 
            checked={item.status} 
            onChange={() => toggleStatus(item.id)}
            aria-label={`Mark "${item.title}" as ${item.status ? 'incomplete' : 'complete'}`}
          />
          <span>{item.title}</span>
          <button 
            onClick={handleEdit}
            aria-label={`Edit "${item.title}"`}
          >
            Edit
          </button>
          <button 
            onClick={() => deleteTodo(item.id)}
            aria-label={`Delete "${item.title}"`}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
});

export default TodoItem;