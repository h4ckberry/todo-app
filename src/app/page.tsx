'use client'
import { useState } from 'react';

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Add
          </button>
        </div>
        <ul className="list-disc list-inside">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{task}</span>
              <button
                onClick={() => removeTask(index)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}