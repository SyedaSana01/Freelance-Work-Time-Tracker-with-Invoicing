import React from 'react';
import { Task } from '../types';
import { Play, Pause, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateTask, onDeleteTask }) => {
  const toggleTimer = () => {
    if (task.isRunning) {
      const now = Date.now();
      const elapsed = now - (task.startTime || now);
      onUpdateTask({
        ...task,
        isRunning: false,
        timeSpent: task.timeSpent + elapsed,
        startTime: null,
      });
    } else {
      onUpdateTask({
        ...task,
        isRunning: true,
        startTime: Date.now(),
      });
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const totalTime = task.isRunning
    ? task.timeSpent + (Date.now() - (task.startTime || Date.now()))
    : task.timeSpent;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{task.name}</h3>
        <p className="text-gray-600">Cost: ${task.costPerHour.toFixed(2)}/hr</p>
        <p className="text-gray-600">Time: {formatTime(totalTime)}</p>
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleTimer}
          className={`mr-2 p-2 rounded ${
            task.isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {task.isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={() => onDeleteTask(task.id)}
          className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;