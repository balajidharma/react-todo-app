import { memo, useActionState } from 'react';
import { CreateTodoProps } from '../types';

const CreateTodo = memo(function CreateTodo({ addTodo }: CreateTodoProps) {
  const [, action] = useActionState(async (prevState: any, formData: FormData) => {
    const todo = formData.get('todo') as string;
    if (todo && todo.trim()) {
      addTodo(todo.trim());
    }
    return prevState;
  }, null);

  console.log('Rendering <CreateTodo />');

  return (
    <form
      className="create-todo"
      action={action}
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
      <button type="submit">Add</button>
    </form>
  );
});

export default CreateTodo;