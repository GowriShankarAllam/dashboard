import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ClipboardList, Award, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import { Button } from '../../components/common/Button';

// Mock data for student dashboard
const mockCourses = [
  { id: 1, name: 'Introduction to Calculus', instructor: 'Dr. Michael Chen', progress: 65 },
  { id: 2, name: 'Physics 101', instructor: 'Prof. Sarah Johnson', progress: 78 },
  { id: 3, name: 'World History', instructor: 'Dr. James Wilson', progress: 92 },
  { id: 4, name: 'English Literature', instructor: 'Prof. Emily Parker', progress: 45 },
];

const mockUpcomingExams = [
  { id: 1, name: 'Calculus Midterm', course: 'Introduction to Calculus', date: '2025-05-15T10:00:00', duration: '2 hours' },
  { id: 2, name: 'Physics Lab Exam', course: 'Physics 101', date: '2025-05-18T13:00:00', duration: '1.5 hours' },
];

const mockEvents = [
  { id: 1, name: 'Science Fair 2025', date: '2025-05-20T09:00:00', location: 'Main Campus Hall' },
  { id: 2, name: 'Guest Lecture: AI in Education', date: '2025-05-12T14:00:00', location: 'Lecture Hall B' },
];

export default function StudentDashboard() {
  const [courses, setCourses] = useState(mockCourses);
  const [upcomingExams, setUpcomingExams] = useState(mockUpcomingExams);
  const [events, setEvents] = useState(mockEvents);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <div className="mt-3 sm:mt-0">
          <Button
            variant="primary"
            size="sm"
            icon={<BookOpen size={16} />}
          >
            My Courses
          </Button>
        </div>
      </div>

      {/* Course Progress */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">My Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <>
              {[1, 2].map(i => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="animate-pulse space-y-3">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900">{course.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${course.progress >= 80 ? 'bg-green-500' : course.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="ghost" size="sm">
                      View Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <div className="mt-4 text-center">
          <Link to="/courses">
            <Button variant="ghost">View All Courses</Button>
          </Link>
        </div>
      </div>

      {/* Upcoming Exams and Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Exams</h2>
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : upcomingExams.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {upcomingExams.map((exam) => (
                    <li key={exam.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{exam.name}</h3>
                          <p className="mt-1 text-xs text-gray-500">{exam.course}</p>
                          <p className="mt-1 text-xs text-gray-500">Duration: {exam.duration}</p>
                        </div>
                        <div className="text-sm text-gray-500">{formatDate(exam.date)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming exams</h3>
                  <p className="mt-1 text-sm text-gray-500">You don't have any upcoming exams scheduled.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" fullWidth>
                View All Exams
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <Card>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-6">
                  {[1, 2].map(i => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : events.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <li key={event.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{event.name}</h3>
                          <p className="mt-1 text-xs text-gray-500">{event.location}</p>
                        </div>
                        <div className="text-sm text-gray-500">{formatDate(event.date)}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming events</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no upcoming events at this time.</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" fullWidth>
                View All Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Overview</h2>
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-full text-primary-600">
                  <Award size={24} />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">GPA</h3>
                <p className="text-3xl font-bold text-primary-600">3.8</p>
                <p className="text-sm text-gray-500">Current Semester</p>
              </div>
              
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center p-3 bg-secondary-100 rounded-full text-secondary-600">
                  <TrendingUp size={24} />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">Attendance</h3>
                <p className="text-3xl font-bold text-secondary-600">96%</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </div>
              
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center p-3 bg-accent-100 rounded-full text-accent-600">
                  <Award size={24} />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">Rank</h3>
                <p className="text-3xl font-bold text-accent-600">15<span className="text-base font-normal">/180</span></p>
                <p className="text-sm text-gray-500">In your class</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Link to="/performance">
                <Button variant="ghost" fullWidth>
                  View Detailed Performance
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}