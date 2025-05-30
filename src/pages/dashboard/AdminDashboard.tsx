import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Calendar, ClipboardList, BarChart2, Settings, Bell, UserPlus, School, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

// Mock data for admin dashboard
const mockStats = {
  totalStudents: 1250,
  totalFaculty: 75,
  activeExams: 8,
  pendingEvents: 12,
  attendanceRate: 92,
  newRegistrations: 45,
  averageGrade: 'B+',
  courseCompletion: 87,
};

const mockRecentActivities = [
  {
    id: 1,
    type: 'user',
    action: 'New faculty member added',
    description: 'Dr. Jennifer Wilson was added to the Mathematics department',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: UserPlus,
  },
  {
    id: 2,
    type: 'event',
    action: 'New event scheduled',
    description: 'Science Fair 2025 has been scheduled for May 15-16',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    icon: Calendar,
  },
  {
    id: 3,
    type: 'exam',
    action: 'Final exams schedule published',
    description: 'Spring 2025 final examination schedule is now available',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    icon: ClipboardList,
  },
  {
    id: 4,
    type: 'grade',
    action: 'Semester grades published',
    description: 'Fall 2024 semester grades have been finalized and published',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: Award,
  },
];

const mockPerformanceData = {
  departments: [
    { name: 'Computer Science', studentCount: 280, averageGrade: 3.8, attendanceRate: 94 },
    { name: 'Mathematics', studentCount: 210, averageGrade: 3.6, attendanceRate: 91 },
    { name: 'Physics', studentCount: 175, averageGrade: 3.5, attendanceRate: 89 },
    { name: 'Chemistry', studentCount: 195, averageGrade: 3.7, attendanceRate: 92 },
  ],
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats);
  const [recentActivities, setRecentActivities] = useState(mockRecentActivities);
  const [performanceData, setPerformanceData] = useState(mockPerformanceData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Format relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Settings size={16} />}
          >
            Settings
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Users size={16} />}
          >
            Manage Users
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-primary-100 text-primary-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="h-7 w-16 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    stats.totalStudents.toLocaleString()
                  )}
                </h3>
                <p className="mt-1 text-sm text-green-600">+{stats.newRegistrations} new this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-secondary-100 text-secondary-600">
                <BookOpen size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Faculty Members</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="h-7 w-12 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    stats.totalFaculty
                  )}
                </h3>
                <p className="mt-1 text-sm text-gray-600">Across all departments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-accent-100 text-accent-600">
                <School size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Course Completion</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="h-7 w-12 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    `${stats.courseCompletion}%`
                  )}
                </h3>
                <p className="mt-1 text-sm text-gray-600">Average rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-green-100 text-green-600">
                <Award size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Grade</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="h-7 w-8 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    stats.averageGrade
                  )}
                </h3>
                <p className="mt-1 text-sm text-gray-600">All courses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Department Performance</h2>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Average GPA
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {performanceData.departments.map((dept, index) => (
                      <tr key={dept.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dept.studentCount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{dept.averageGrade.toFixed(1)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-green-500 rounded-full" 
                                style={{ width: `${dept.attendanceRate}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{dept.attendanceRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        activity.type === 'user' ? 'bg-primary-100 text-primary-600' :
                        activity.type === 'event' ? 'bg-green-100 text-green-600' :
                        activity.type === 'exam' ? 'bg-accent-100 text-accent-600' :
                        'bg-secondary-100 text-secondary-600'
                      }`}>
                        <activity.icon size={20} />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" fullWidth>
              View All Activity
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <UserPlus className="mr-2" size={18} />
            Add New User
          </Button>
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <ClipboardList className="mr-2" size={18} />
            Create Exam
          </Button>
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <Calendar className="mr-2" size={18} />
            Schedule Event
          </Button>
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <BarChart2 className="mr-2" size={18} />
            Generate Reports
          </Button>
        </div>
      </div>
    </div>
  );
}