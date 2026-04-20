'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import TaskForm from '@/components/TaskForm';
import TaskCard from '@/components/TaskCard';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate?: string;
  category?: { name: string; color: string };
  categoryId?: string;
}

interface Category {
  id: string;
  name: string;
}

export default function TasksPage() {
  const { token } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, categoriesRes] = await Promise.all([
          axios.get('/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/categories', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setTasks(tasksRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleAddTask = async (data: any) => {
    try {
      const response = await axios.post('/api/tasks', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([response.data, ...tasks]);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleUpdateTask = async (data: any) => {
    if (!editingTask) return;

    try {
      const response = await axios.put(`/api/tasks/${editingTask.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? response.data.task : t))
      );
      setEditingTask(null);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    try {
      const response = await axios.put(
        `/api/tasks/${taskId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks(
        tasks.map((t) => (t.id === taskId ? response.data.task : t))
      );
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const filteredTasks =
    filterStatus === 'ALL'
      ? tasks
      : tasks.filter((t) => t.status === filterStatus);

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
              <p className="text-gray-600">Manage and organize your tasks</p>
            </div>
            <Button onClick={() => {
              setEditingTask(null);
              setShowModal(true);
            }}>
              ➕ New Task
            </Button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {['ALL', 'TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status === 'ALL' ? 'All Tasks' : status.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Tasks Grid */}
          {filteredTasks.length > 0 ? (
            <div className="grid gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={(t) => {
                    setEditingTask(t);
                    setShowModal(true);
                  }}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No tasks found</p>
              <Button onClick={() => {
                setEditingTask(null);
                setShowModal(true);
              }}>
                Create your first task
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        size="lg"
      >
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          initialData={editingTask || undefined}
          categories={categories}
        />
      </Modal>
    </div>
  );
}
