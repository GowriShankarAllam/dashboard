import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Plus, Search, Filter, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/authStore';

// Mock exam data
const mockExams = [
  {
    id: 1,
    title: 'Calculus Midterm',
    subject: 'Mathematics',
    date: '2025-05-15',
    time: '10:00 AM - 12:00 PM',
    status: 'upcoming',
    studentCount: 125,
  },
  {
    id: 2,
    title: 'Physics Lab Test',
    subject: 'Physics',
    date: '2025-05-18',
    time: '01:00 PM - 02:30 PM',
    status: 'upcoming',
    studentCount: 85,
  },
  {
    id: 3,
    title: 'World History Quiz',
    subject: 'History',
    date: '2025-05-10',
    time: '09:00 AM - 10:00 AM',
    status: 'completed',
    studentCount: 95,
  },
  {
    id: 4,
    title: 'English Literature Essay',
    subject: 'English',
    date: '2025-05-08',
    time: '02:00 PM - 04:00 PM',
    status: 'completed',
    studentCount: 78,
  },
  {
    id: 5,
    title: 'Biology Final Exam',
    subject: 'Biology',
    date: '2025-06-05',
    time: '10:00 AM - 12:00 PM',
    status: 'upcoming',
    studentCount: 110,
  },
];

export default function ExamsList() {
  const [exams, setExams] = useState(mockExams);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter exams based on search term and status filter
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tests & Exams</h1>
        {user?.role !== 'student' && (
          <div className="mt-3 sm:mt-0">
            <Button
              variant="primary"
              size="sm"
              icon={<Plus size={16} />}
            >
              Create New Exam
            </Button>
          </div>
        )}
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search exams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>
        <div className="w-full md:w-1/2 flex space-x-4">
          <select
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <Button
            variant="outline"
            className="px-3"
            icon={<Filter size={18} />}
          >
            Filters
          </Button>
        </div>
      </div>
      
      {/* Exams List */}
      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredExams.length > 0 ? (
          <div className="space-y-4">
            {filteredExams.map((exam) => (
              <Card key={exam.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="p-2 rounded-md bg-primary-100 text-primary-600 mr-4">
                          <ClipboardList size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exam.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{exam.subject}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-4">
                        <div className="flex items-center">
                          <Calendar size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{formatDate(exam.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{exam.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{exam.studentCount} students</span>
                        </div>
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            exam.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' :
                            exam.status === 'active' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Link to={`/exams/${exam.id}`}>
                        <Button variant="primary" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No exams found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' ? 
                'Try adjusting your search or filters.' : 
                'There are no exams to display.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Clock component
function Clock(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}