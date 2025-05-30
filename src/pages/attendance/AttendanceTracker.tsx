import { useState, useEffect } from 'react';
import { Check, X, Search, Filter, ChevronDown, Download } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/authStore';

// Mock data for attendance
const mockCourses = [
  { id: 1, code: 'MATH101', name: 'Introduction to Calculus' },
  { id: 2, code: 'PHYS101', name: 'Physics 101' },
  { id: 3, code: 'HIST201', name: 'World History' },
  { id: 4, code: 'ENG102', name: 'English Literature' },
];

const mockStudents = [
  { id: 1, firstName: 'Emma', lastName: 'Johnson', studentId: 'S10001', avatar: null },
  { id: 2, firstName: 'Noah', lastName: 'Williams', studentId: 'S10002', avatar: null },
  { id: 3, firstName: 'Olivia', lastName: 'Smith', studentId: 'S10003', avatar: null },
  { id: 4, firstName: 'Liam', lastName: 'Brown', studentId: 'S10004', avatar: null },
  { id: 5, firstName: 'Ava', lastName: 'Jones', studentId: 'S10005', avatar: null },
  { id: 6, firstName: 'William', lastName: 'Garcia', studentId: 'S10006', avatar: null },
  { id: 7, firstName: 'Sophia', lastName: 'Miller', studentId: 'S10007', avatar: null },
  { id: 8, firstName: 'Benjamin', lastName: 'Davis', studentId: 'S10008', avatar: null },
  { id: 9, firstName: 'Isabella', lastName: 'Rodriguez', studentId: 'S10009', avatar: null },
  { id: 10, firstName: 'James', lastName: 'Martinez', studentId: 'S10010', avatar: null },
  { id: 11, firstName: 'Charlotte', lastName: 'Hernandez', studentId: 'S10011', avatar: null },
  { id: 12, firstName: 'Lucas', lastName: 'Lopez', studentId: 'S10012', avatar: null },
];

// Generate mock attendance records for the last 14 days
const generateAttendanceRecords = () => {
  const today = new Date();
  const records: Record<string, Record<number, boolean>> = {};
  
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    records[dateStr] = {};
    
    mockStudents.forEach(student => {
      // Random attendance with ~80% present rate
      records[dateStr][student.id] = Math.random() > 0.2;
    });
  }
  
  return records;
};

const mockAttendanceRecords = generateAttendanceRecords();

export default function AttendanceTracker() {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(1);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  
  useEffect(() => {
    if (selectedDate && selectedCourse) {
      // Load attendance for the selected date
      const timer = setTimeout(() => {
        setAttendance(mockAttendanceRecords[selectedDate] || {});
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [selectedDate, selectedCourse]);
  
  // Filter students based on search term
  const filteredStudents = mockStudents.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  // Mark student present/absent
  const toggleAttendance = (studentId: number) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };
  
  // Mark all students present/absent
  const markAll = (status: boolean) => {
    const newAttendance = { ...attendance };
    filteredStudents.forEach(student => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
  };
  
  // Calculate attendance stats
  const calculateStats = () => {
    let present = 0;
    let absent = 0;
    
    filteredStudents.forEach(student => {
      if (attendance[student.id]) {
        present++;
      } else {
        absent++;
      }
    });
    
    const total = present + absent;
    const presentPercentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { present, absent, total, presentPercentage };
  };
  
  const stats = calculateStats();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>
        <div className="mt-3 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            icon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      
      {/* Course & Date Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
          <div className="relative">
            <select
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none"
              value={selectedCourse || ''}
              onChange={(e) => setSelectedCourse(Number(e.target.value))}
            >
              <option value="" disabled>Select a course</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
          <input
            type="date"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>
      
      {/* Attendance Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-lg bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">Total Students</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stats.total}</p>
            </div>
            <div className="p-4 rounded-lg bg-green-50">
              <h3 className="text-sm font-medium text-green-600">Present</h3>
              <p className="mt-1 text-2xl font-semibold text-green-700">{stats.present}</p>
            </div>
            <div className="p-4 rounded-lg bg-red-50">
              <h3 className="text-sm font-medium text-red-600">Absent</h3>
              <p className="mt-1 text-2xl font-semibold text-red-700">{stats.absent}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary-50">
              <h3 className="text-sm font-medium text-primary-600">Attendance Rate</h3>
              <p className="mt-1 text-2xl font-semibold text-primary-700">{stats.presentPercentage}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Attendance List */}
      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-grow">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search size={18} />}
            />
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              icon={<Check size={16} />}
              onClick={() => markAll(true)}
            >
              Mark All Present
            </Button>
            <Button
              variant="outline"
              icon={<X size={16} />}
              onClick={() => markAll(false)}
            >
              Mark All Absent
            </Button>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center py-2">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="ml-4 space-y-1 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                      </div>
                      <div className="h-8 w-20 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <li key={student.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={`${student.firstName} ${student.lastName}`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <span>{student.firstName[0]}{student.lastName[0]}</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-xs text-gray-500">{student.studentId}</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => toggleAttendance(student.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            attendance[student.id]
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {attendance[student.id] ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Present
                            </>
                          ) : (
                            <>
                              <X size={16} className="mr-1" />
                              Absent
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="primary">Save Attendance</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}