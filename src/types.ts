export interface Todo {
  id: string;
  title: string;
  status: boolean;
}

export interface TodoItemProps {
  item: Todo;
  toggleStatus: (id: string) => void;
  editTodo: (id: string, title: string) => void;
  deleteTodo: (id: string) => void;
}

export interface CreateTodoProps {
  addTodo: (title: string) => void;
}

export interface TodoProps {
  theme: 'dark' | 'light';
  todoList: Todo[];
  localStorageName: string
}

export type LoggerLevel = 'log' | 'warn' | 'info';