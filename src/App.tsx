import Todo from './Component/Todo'
import './App.css'
import { useState } from 'react';
import { Todo as TodoType } from './types';

const todoList: TodoType[] = [
  {'id': crypto.randomUUID(), 'title':"Create Counter", 'status':true},
  {'id': crypto.randomUUID(), 'title':"Create ToDo APP", 'status':false},
  {'id': crypto.randomUUID(), 'title':"Create Timer APP", 'status':false}
];

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div role="main">
      <label className="theme-toggle">
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
          aria-label="Toggle dark mode"
        />
        Dark mode
      </label>
      <h1>React TODO APP</h1>
      <Todo 
        theme={isDark ? 'dark' : 'light'}
        todoList={todoList}
        localStorageName='todo_list'
      />
    </div>
  )
}

export default App