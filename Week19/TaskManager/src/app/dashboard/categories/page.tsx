'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import Button from '@/components/Button';
import Modal from '@/components/Modal';

interface Category {
  id: string;
  name: string;
  color: string;
  _count?: { tasks: number };
}

export default function CategoriesPage() {
  const { token } = useAuthStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', color: '#3B82F6' });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCategories();
    }
  }, [token]);

  const handleAddCategory = async () => {
    if (!formData.name.trim()) return;

    try {
      const response = await axios.post('/api/categories', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories([...categories, response.data]);
      setFormData({ name: '', color: '#3B82F6' });
      setShowModal(false);
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !formData.name.trim()) return;

    try {
      const response = await axios.put(
        `/api/categories/${editingCategory.id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id ? response.data.category : c
        )
      );
      setEditingCategory(null);
      setFormData({ name: '', color: '#3B82F6' });
      setShowModal(false);
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((c) => c.id !== categoryId));
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
              <p className="text-gray-600">Organize your tasks with categories</p>
            </div>
            <Button onClick={() => {
              setEditingCategory(null);
              setFormData({ name: '', color: '#3B82F6' });
              setShowModal(true);
            }}>
              ➕ New Category
            </Button>
          </div>

          {/* Categories Grid */}
          {categories.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                  style={{ borderTop: `4px solid ${category.color}` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {category._count?.tasks || 0} tasks
                      </p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {
                        setEditingCategory(category);
                        setFormData({
                          name: category.name,
                          color: category.color,
                        });
                        setShowModal(true);
                      }}
                    >
                      ✎ Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No categories yet</p>
              <Button onClick={() => {
                setEditingCategory(null);
                setFormData({ name: '', color: '#3B82F6' });
                setShowModal(true);
              }}>
                Create your first category
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={editingCategory ? 'Edit Category' : 'Create New Category'}
        onClose={() => {
          setShowModal(false);
          setEditingCategory(null);
          setFormData({ name: '', color: '#3B82F6' });
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter category name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="h-10 w-20 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) =>
                  setFormData({ ...formData, color: e.target.value })
                }
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <Button
            className="w-full"
            onClick={editingCategory ? handleUpdateCategory : handleAddCategory}
          >
            {editingCategory ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
