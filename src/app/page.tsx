'use client'
import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoStatus, CreateTodoInput } from '@/types/todo';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'dueDate' | 'createdAt'>('createdAt');
  const [formData, setFormData] = useState<CreateTodoInput>({
    title: '',
    description: '',
    dueDate: undefined
  });

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/todos?sortBy=${sortBy}&order=asc`);
      if (response.ok) {
        const data = await response.json();
        setTodos(data.map((todo: Todo & { createdAt: string; updatedAt: string; dueDate: string | null }) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : null
        })));
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ title: '', description: '', dueDate: undefined });
        fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodoStatus = async (id: number, status: TodoStatus) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const getStatusColor = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.PENDING:
        return 'bg-gray-200 text-gray-800';
      case TodoStatus.IN_PROGRESS:
        return 'bg-blue-200 text-blue-800';
      case TodoStatus.COMPLETED:
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getNextStatus = (status: TodoStatus): TodoStatus => {
    switch (status) {
      case TodoStatus.PENDING:
        return TodoStatus.IN_PROGRESS;
      case TodoStatus.IN_PROGRESS:
        return TodoStatus.COMPLETED;
      case TodoStatus.COMPLETED:
        return TodoStatus.PENDING;
      default:
        return TodoStatus.PENDING;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Todo App</h1>
        
        {/* Task Creation Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
          <form onSubmit={addTodo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter task description"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={formData.dueDate ? new Date(formData.dueDate).toISOString().slice(0, 16) : ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  dueDate: e.target.value ? new Date(e.target.value) : undefined 
                })}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Sort Controls */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'dueDate' | 'createdAt')}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="createdAt">Created Date</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {todos.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-500">No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
                
                {todo.description && (
                  <p className="text-gray-600 mb-3">{todo.description}</p>
                )}
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>Created: {todo.createdAt.toLocaleDateString()}</span>
                  {todo.dueDate && (
                    <span className={`${todo.dueDate < new Date() ? 'text-red-500' : ''}`}>
                      Due: {todo.dueDate.toLocaleDateString()} {todo.dueDate.toLocaleTimeString()}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(todo.status)}`}>
                    {todo.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => updateTodoStatus(todo.id, getNextStatus(todo.status))}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Move to {getNextStatus(todo.status).replace('_', ' ')}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}