import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import InvoiceForm from './components/InvoiceForm';
import { Task } from './types';
import { generateInvoice } from './utils/invoiceGenerator';
import { Clock } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleGenerateInvoice = (invoiceDetails: any) => {
    generateInvoice(tasks, invoiceDetails);
    setShowInvoiceForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Clock className="mr-2" /> Task Timer
          </h1>
          <button
            onClick={() => setShowInvoiceForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate Invoice
          </button>
        </header>
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        {showInvoiceForm && (
          <InvoiceForm onSubmit={handleGenerateInvoice} onCancel={() => setShowInvoiceForm(false)} />
        )}
      </div>
    </div>
  );
}

export default App;