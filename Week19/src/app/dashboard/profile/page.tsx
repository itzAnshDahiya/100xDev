'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import Button from '@/components/Button';

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { token, user, setUser } = useAuthStore();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setFormData({
          name: response.data.name,
          bio: response.data.bio || '',
          avatar: response.data.avatar || '',
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const handleSaveProfile = async () => {
    setIsSaving(true);

    try {
      const response = await axios.put('/api/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = response.data.user;
      setProfile(updatedUser);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
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
        <div className="p-6 md:p-10 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600 mb-8">Manage your account information</p>

          {profile && (
            <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600">{profile.email}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Member since {new Date(profile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <hr />

              {isEditing ? (
                // Edit Form
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveProfile}
                      isLoading={isSaving}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          name: profile.name,
                          bio: profile.bio || '',
                          avatar: profile.avatar || '',
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View Mode
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <p className="text-gray-900">{profile.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <p className="text-gray-900">
                      {profile.bio || 'No bio added yet'}
                    </p>
                  </div>

                  <Button onClick={() => setIsEditing(true)}>
                    ✎ Edit Profile
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
