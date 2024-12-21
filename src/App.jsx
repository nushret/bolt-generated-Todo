import React, { useState } from 'react';

    function App() {
      const [todos, setTodos] = useState([]);
      const [newTodo, setNewTodo] = useState('');

      const handleInputChange = (event) => {
        setNewTodo(event.target.value);
      };

      const addTodo = () => {
        if (newTodo.trim() !== '') {
          setTodos([...todos, { text: newTodo, completed: false, createdAt: new Date() }]);
          setNewTodo('');
        }
      };

      const toggleTodo = (index) => {
        const updatedTodos = todos.map((todo, i) =>
          i === index
            ? {
                ...todo,
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date() : null,
              }
            : todo
        );
        setTodos(updatedTodos);
      };

      const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
      };

      const formatDate = (date) => {
        if (!date) return null;
        const dt = new Date(date);
        const day = String(dt.getDate()).padStart(2, '0');
        const month = String(dt.getMonth() + 1).padStart(2, '0');
        const year = dt.getFullYear();
        const hours = String(dt.getHours()).padStart(2, '0');
        const minutes = String(dt.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
      };

      return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
            <div className="flex mb-4">
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add new todo"
                value={newTodo}
                onChange={handleInputChange}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={addTodo}
              >
                Add
              </button>
            </div>
            <div>
              {todos.map((todo, index) => (
                <div key={index} className="mb-4 p-2 border rounded">
                  <div className="flex justify-between items-center">
                    <span
                      className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}
                      onClick={() => toggleTodo(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      {todo.text}
                    </span>
                    <button
                      className="text-red-500 hover:text-red-700 font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="text-gray-600 text-sm mt-1">
                    Created At: {formatDate(todo.createdAt)}
                  </div>
                  {todo.completed && (
                    <div className="text-gray-600 text-sm">
                      Completed At: {formatDate(todo.completedAt)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    export default App;
