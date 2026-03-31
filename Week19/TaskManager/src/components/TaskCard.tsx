'use client';

import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: string;
  category?: { name: string; color: string };
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const priorityColors = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-orange-100 text-orange-800',
  URGENT: 'bg-red-100 text-red-800',
};

const statusColors = {
  TODO: 'bg-gray-100 text-gray-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  REVIEW: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border-l-4" style={{borderLeftColor: task.category?.color || '#3B82F6'}}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-500 hover:text-gray-700 p-1"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onEdit(task);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                ✎ Edit
              </button>
              <button
                onClick={() => {
                  onDelete(task.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
        {task.category && (
          <span
            className="text-xs px-2 py-1 rounded-full font-medium text-white"
            style={{ backgroundColor: task.category.color }}
          >
            {task.category.name}
          </span>
        )}
      </div>

      {/* Status Selector */}
      <div className="flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="REVIEW">Review</option>
          <option value="COMPLETED">Completed</option>
        </select>
        {formattedDate && (
          <span className="text-xs text-gray-500">{formattedDate}</span>
        )}
      </div>
    </div>
  );
}
