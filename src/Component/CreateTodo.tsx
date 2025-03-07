import { memo } from 'react';
import { CreateTodoProps } from '../types';

const CreateTodo = memo(function CreateTodo({ addTodo }: CreateTodoProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const todoInput = form.elements.namedItem('todo') as HTMLInputElement;
    if (todoInput.value.trim()) {
      addTodo(todoInput.value);
      form.reset();
    }
  }

  console.log('Rendering <CreateTodo />');

  return (
    <form 
      className='create-todo' 
      onSubmit={handleSubmit}
      aria-label="Create new todo"
    >
      <label htmlFor="todo">
        <span className="sr-only">New todo title</span>
        <input
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
          required
        />
      </label>
      <button type='submit'>Add</button>
    </form>
  );
});

export default CreateTodo;