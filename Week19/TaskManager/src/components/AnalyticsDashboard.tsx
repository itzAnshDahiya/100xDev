'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StatsData {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  completionRate: number;
  tasksByPriority: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    URGENT: number;
  };
}

interface AnalyticsDashboardProps {
  data: StatsData;
}

export default function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  const statusData = [
    { name: 'Todo', value: data.todoTasks, color: '#EF4444' },
    { name: 'In Progress', value: data.inProgressTasks, color: '#3B82F6' },
    { name: 'Completed', value: data.completedTasks, color: '#10B981' },
  ];

  const priorityData = [
    { name: 'Low', value: data.tasksByPriority.LOW, color: '#3B82F6' },
    { name: 'Medium', value: data.tasksByPriority.MEDIUM, color: '#F59E0B' },
    { name: 'High', value: data.tasksByPriority.HIGH, color: '#EF4444' },
    { name: 'Urgent', value: data.tasksByPriority.URGENT, color: '#991B1B' },
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-600 text-sm font-medium mb-2">Total Tasks</div>
          <div className="text-3xl font-bold text-gray-900">{data.totalTasks}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-600 text-sm font-medium mb-2">Completed</div>
          <div className="text-3xl font-bold text-green-600">{data.completedTasks}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-600 text-sm font-medium mb-2">In Progress</div>
          <div className="text-3xl font-bold text-blue-600">{data.inProgressTasks}</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-600 text-sm font-medium mb-2">Completion Rate</div>
          <div className="text-3xl font-bold text-purple-600">{data.completionRate}%</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
