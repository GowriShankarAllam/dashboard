import { useState, useEffect } from 'react';
import { Search, Filter, Medal, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

// Mock data for leaderboard
const mockLeaderboardData = [
  { id: 1, rank: 1, name: 'Emma Johnson', studentId: 'S10001', score: 98, change: 0 },
  { id: 2, rank: 2, name: 'Noah Williams', studentId: 'S10002', score: 95, change: 2 },
  { id: 3, rank: 3, name: 'Olivia Smith', studentId: 'S10003', score: 93, change: -1 },
  { id: 4, rank: 4, name: 'Liam Brown', studentId: 'S10004', score: 91, change: 1 },
  { id: 5, rank: 5, name: 'Ava Jones', studentId: 'S10005', score: 90, change: -2 },
  { id: 6, rank: 6, name: 'William Garcia', studentId: 'S10006', score: 88, change: 3 },
  { id: 7, rank: 7, name: 'Sophia Miller', studentId: 'S10007', score: 87, change: 0 },
  { id: 8, rank: 8, name: 'Benjamin Davis', studentId: 'S10008', score: 86, change: -1 },
  { id: 9, rank: 9, name: 'Isabella Rodriguez', studentId: 'S10009', score: 85, change: 2 },
  { id: 10, rank: 10, name: 'James Martinez', studentId: 'S10010', score: 84, change: -2 },
  { id: 11, rank: 11, name: 'Charlotte Hernandez', studentId: 'S10011', score: 82, change: 5 },
  { id: 12, rank: 12, name: 'Lucas Lopez', studentId: 'S10012', score: 80, change: 1 },
  { id: 13, rank: 13, name: 'Mia Gonzalez', studentId: 'S10013', score: 78, change: -3 },
  { id: 14, rank: 14, name: 'Ethan Wilson', studentId: 'S10014', score: 77, change: 0 },
  { id: 15, rank: 15, name: 'Amelia Anderson', studentId: 'S10015', score: 76, change: 4 },
];

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState(mockLeaderboardData);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter students based on search term
  const filteredStudents = leaderboardData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="p-2 mx-auto w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
              <Medal className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">Top Performers</h3>
            <p className="text-sm text-gray-500">Students with highest average scores</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="p-2 mx-auto w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">Most Improved</h3>
            <p className="text-sm text-gray-500">Students with greatest performance gain</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="p-2 mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="mt-3 text-lg font-semibold text-gray-900">Perfect Attendance</h3>
            <p className="text-sm text-gray-500">Students with 100% attendance rate</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>
        <div className="w-full md:w-1/2 flex space-x-4">
          <div className="relative flex-1">
            <select
              className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 appearance-none"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="overall">Overall Performance</option>
              <option value="academic">Academic Achievement</option>
              <option value="attendance">Attendance</option>
              <option value="participation">Class Participation</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
          <Button
            variant="outline"
            className="px-3"
            icon={<Filter size={18} />}
          >
            Filters
          </Button>
        </div>
      </div>
      
      {/* Leaderboard Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedCategory === 'overall' && 'Overall Performance Ranking'}
            {selectedCategory === 'academic' && 'Academic Achievement Ranking'}
            {selectedCategory === 'attendance' && 'Attendance Ranking'}
            {selectedCategory === 'participation' && 'Class Participation Ranking'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center py-4">
                    <div className="w-8 text-center">
                      <div className="h-6 w-6 bg-gray-200 rounded-full mx-auto"></div>
                    </div>
                    <div className="ml-4 space-y-1 flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    </div>
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Score
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Change
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-800">
                          {student.rank <= 3 ? (
                            <span className={`flex items-center justify-center w-8 h-8 rounded-full ${
                              student.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                              student.rank === 2 ? 'bg-gray-100 text-gray-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {student.rank === 1 && <Medal className="w-4 h-4 text-yellow-600" />}
                              {student.rank === 2 && <Medal className="w-4 h-4 text-gray-500" />}
                              {student.rank === 3 && <Medal className="w-4 h-4 text-amber-700" />}
                            </span>
                          ) : (
                            <span>{student.rank}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                            <span>{student.name.split(' ')[0][0]}{student.name.split(' ')[1][0]}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-xs text-gray-500">{student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.score >= 90 ? 'bg-green-100 text-green-800' :
                          student.score >= 80 ? 'bg-blue-100 text-blue-800' :
                          student.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {student.score}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end">
                          {student.change > 0 ? (
                            <span className="inline-flex items-center text-green-600">
                              <TrendingUp size={16} className="mr-1" />
                              +{student.change}
                            </span>
                          ) : student.change < 0 ? (
                            <span className="inline-flex items-center text-red-600">
                              <TrendingDown size={16} className="mr-1" />
                              {student.change}
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-gray-500">
                              —
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" size="sm">
            View Full Ranking
          </Button>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Showing {filteredStudents.length} of {mockLeaderboardData.length} students</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// Calendar component
function Calendar(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || props.size || 24}
      height={props.height || props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}