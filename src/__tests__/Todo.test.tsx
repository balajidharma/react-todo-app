import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from '../Component/Todo';

describe('Todo Component', () => {
  const mockTodoList = [
    { id: '1', title: 'Test Todo', status: false }
  ];

  it('renders todo list correctly', () => {
    render(<Todo theme="light" todoList={mockTodoList} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('adds new todo', async () => {
    render(<Todo theme="light" todoList={[]} />);
    
    const input = screen.getByPlaceholderText('Write your next task');
    const addButton = screen.getByText('Add');

    await userEvent.type(input, 'New Todo');
    await userEvent.click(addButton);

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  it('toggles todo status', async () => {
    render(<Todo theme="light" todoList={mockTodoList} />);
    
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    expect(checkbox).toBeChecked();
  });

  it('edits todo', async () => {
    render(<Todo theme="light" todoList={mockTodoList} />);
    
    const editButton = screen.getByRole('button', { name: /edit "test todo"/i });
    await userEvent.click(editButton);

    const input = screen.getByRole('textbox');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated Todo');
    
    const updateButton = screen.getByText('Update');
    await userEvent.click(updateButton);

    expect(screen.getByText('Updated Todo')).toBeInTheDocument();
  });

  it('deletes todo', async () => {
    render(<Todo theme="light" todoList={mockTodoList} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete "test todo"/i });
    await userEvent.click(deleteButton);

    expect(screen.queryByText('Test Todo')).not.toBeInTheDocument();
  });
});