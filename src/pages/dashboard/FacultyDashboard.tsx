import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Calendar, ClipboardList, CheckSquare, Bell, BarChart2, UserPlus, School } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

// Mock data for faculty dashboard
const mockStats = {
  totalStudents: 180,
  activeCourses: 4,
  scheduledExams: 3,
  pendingGrading: 28,
  attendanceToday: 94,
  averageGrade: 'B+',
  courseCompletion: 78,
};

const mockUpcomingClasses = [
  { id: 1, name: 'Introduction to Calculus', time: '10:00 AM - 11:30 AM', room: 'Math Building, Room 305', attendanceStatus: 'pending' },
  { id: 2, name: 'Advanced Algebra', time: '01:00 PM - 02:30 PM', room: 'Science Building, Room 210', attendanceStatus: 'taken' },
  { id: 3, name: 'Geometry Fundamentals', time: '03:00 PM - 04:30 PM', room: 'Math Building, Room 302', attendanceStatus: 'pending' },
];

const mockRecentSubmissions = [
  { id: 1, title: 'Midterm Exam', course: 'Introduction to Calculus', submissions: 45, pending: 12 },
  { id: 2, title: 'Assignment 3', course: 'Advanced Algebra', submissions: 38, pending: 8 },
  { id: 3, title: 'Quiz 2', course: 'Geometry Fundamentals', submissions: 42, pending: 0 },
];

const mockStudentPerformance = [
  { metric: 'Above Average', count: 65, percentage: 36 },
  { metric: 'Average', count: 85, percentage: 47 },
  { metric: 'Below Average', count: 30, percentage: 17 },
];

export default function FacultyDashboard() {
  const [stats, setStats] = useState(mockStats);
  const [upcomingClasses, setUpcomingClasses] = useState(mockUpcomingClasses);
  const [recentSubmissions, setRecentSubmissions] = useState(mockRecentSubmissions);
  const [studentPerformance, setStudentPerformance] = useState(mockStudentPerformance);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Dashboard</h1>
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Bell size={16} />}
          >
            Notifications
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<ClipboardList size={16} />}
          >
            Create New Exam
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-start">
              <div className="p-2 rounded-md bg-primary-100 text-primary-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">My Students</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="h-7 w-16 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    stats.totalStudents
                  )}
                </h3>
                <p className="mt-1 text-sm text-gray-600">Across all courses</p>
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
                <p className="text-sm font-medium text-gray-500">Active Courses</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="h-7 w-8 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    stats.activeCourses
                  )}
                </h3>
                <p className="mt-1 text-sm text-gray-600">This semester</p>
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
                <CheckSquare size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Grading</p>
                <h3 className="mt-1 text-xl font-semibold text-gray-900">
                  {isLoading ? (
                    <div className="h-7 w-8 animate-pulse bg-gray-200 rounded"></div>
                  ) : (
                    stats.pendingGrading
                  )}
                </h3>
                <p className="mt-1 text-sm text-text-gray-600">Submissions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule and Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex flex-col space-y-2">
                      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              ) : upcomingClasses.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {upcomingClasses.map((cls) => (
                    <li key={cls.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{cls.name}</h3>
                          <p className="mt-1 text-sm text-gray-500">{cls.room}</p>
                          <p className="mt-1 text-xs text-gray-500">{cls.time}</p>
                        </div>
                        <Button
                          variant={cls.attendanceStatus === 'taken' ? 'ghost' : 'primary'}
                          size="sm"
                          disabled={cls.attendanceStatus === 'taken'}
                        >
                          {cls.attendanceStatus === 'taken' ? 'Attendance Taken' : 'Take Attendance'}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No classes scheduled</h3>
                  <p className="mt-1 text-sm text-gray-500">Enjoy your free time!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Submissions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Submissions</h2>
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {recentSubmissions.map((submission) => (
                    <li key={submission.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{submission.title}</h3>
                          <p className="mt-1 text-sm text-gray-500">{submission.course}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {submission.submissions} submissions, {submission.pending} pending
                          </p>
                        </div>
                        {submission.pending > 0 && (
                          <Button variant="outline" size="sm">
                            Grade Now
                          </Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" fullWidth>
                View All Submissions
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Student Performance Overview */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Performance Overview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {studentPerformance.map((category) => (
                <div key={category.metric} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{category.count}</div>
                  <div className="text-sm text-gray-500">{category.metric}</div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        category.metric === 'Above Average' ? 'bg-green-500' :
                        category.metric === 'Average' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">{category.percentage}% of students</div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" fullWidth>
              View Detailed Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <Users className="mr-2" size={18} />
            Take Attendance
          </Button>
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <ClipboardList className="mr-2" size={18} />
            Create Assignment
          </Button>
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <Calendar className="mr-2" size={18} />
            Schedule Event
          </Button>
          <Button variant="outline" fullWidth className="h-auto py-3 justify-start">
            <BarChart2 className="mr-2" size={18} />
            View Reports
          </Button>
        </div>
      </div>
    </div>
  );
}