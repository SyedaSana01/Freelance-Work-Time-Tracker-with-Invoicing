import React, { useState } from 'react';
import { Task } from '../types';
import { Plus } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [costPerHour, setCostPerHour] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && costPerHour) {
      const newTask: Task = {
        id: Date.now().toString(),
        name,
        costPerHour: parseFloat(costPerHour),
        timeSpent: 0,
        isRunning: false,
        startTime: null,
      };
      onAddTask(newTask);
      setName('');
      setCostPerHour('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskName">
          Task Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="taskName"
          type="text"
          placeholder="Enter task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="costPerHour">
          Cost Per Hour ($)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="costPerHour"
          type="number"
          step="0.01"
          min="0"
          placeholder="Enter cost per hour"
          value={costPerHour}
          onChange={(e) => setCostPerHour(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
          type="submit"
        >
          <Plus className="mr-2" /> Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;