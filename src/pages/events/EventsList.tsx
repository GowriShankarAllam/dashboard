import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, MapPin, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuthStore } from '../../store/authStore';

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: 'Science Fair 2025',
    type: 'Academic',
    startDate: '2025-05-20T09:00:00',
    endDate: '2025-05-20T18:00:00',
    location: 'Main Campus Hall',
    description: 'Annual science fair showcasing student projects from all departments.',
    organizer: 'Science Department',
    attendees: 450,
  },
  {
    id: 2,
    title: 'Guest Lecture: AI in Education',
    type: 'Lecture',
    startDate: '2025-05-12T14:00:00',
    endDate: '2025-05-12T16:00:00',
    location: 'Lecture Hall B',
    description: 'Distinguished guest lecture by Dr. Emily Wong on the applications of AI in modern education.',
    organizer: 'Computer Science Department',
    attendees: 120,
  },
  {
    id: 3,
    title: 'Spring Festival',
    type: 'Social',
    startDate: '2025-05-25T11:00:00',
    endDate: '2025-05-25T20:00:00',
    location: 'Campus Grounds',
    description: 'Annual spring festival with food, music, and activities for students and faculty.',
    organizer: 'Student Council',
    attendees: 800,
  },
  {
    id: 4,
    title: 'Career Fair',
    type: 'Career',
    startDate: '2025-06-02T10:00:00',
    endDate: '2025-06-02T15:00:00',
    location: 'University Center',
    description: 'Connect with over 50 employers from various industries for internships and job opportunities.',
    organizer: 'Career Services',
    attendees: 350,
  },
  {
    id: 5,
    title: 'Mathematics Competition',
    type: 'Academic',
    startDate: '2025-05-28T09:00:00',
    endDate: '2025-05-28T16:00:00',
    location: 'Mathematics Building',
    description: 'Annual mathematics competition open to all students.',
    organizer: 'Mathematics Department',
    attendees: 200,
  },
];

export default function EventsList() {
  const [events, setEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter events based on search term and type filter
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || event.type.toLowerCase() === typeFilter.toLowerCase();
    return matchesSearch && matchesType;
  });
  
  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Check if an event is upcoming
  const isUpcoming = (dateString: string) => {
    return new Date(dateString).getTime() > Date.now();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Events</h1>
        {(user?.role === 'admin' || user?.role === 'faculty') && (
          <div className="mt-3 sm:mt-0">
            <Button
              variant="primary"
              size="sm"
              icon={<Calendar size={16} />}
            >
              Create Event
            </Button>
          </div>
        )}
      </div>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
          />
        </div>
        <div className="w-full md:w-1/2 flex space-x-4">
          <select
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="academic">Academic</option>
            <option value="lecture">Lecture</option>
            <option value="social">Social</option>
            <option value="career">Career</option>
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
      
      {/* Events Calendar/Timeline View */}
      <div className="mt-6">
        <div className="flex items-center space-x-4 overflow-x-auto pb-4 md:hidden">
          {Array.from({ length: 14 }).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const isToday = i === 0;
            
            return (
              <div 
                key={i} 
                className={`flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-lg cursor-pointer ${
                  isToday ? 'bg-primary-100 border-2 border-primary-500' : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="text-xs font-medium text-gray-500">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className={`text-xl font-bold ${isToday ? 'text-primary-600' : 'text-gray-900'}`}>
                  {date.getDate()}
                </span>
                <span className="text-xs text-gray-500">
                  {date.toLocaleDateString('en-US', { month: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Events List */}
      <div className="mt-2">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : sortedEvents.length > 0 ? (
          <div className="space-y-4">
            {sortedEvents.map((event) => (
              <Card key={event.id} className={`border-l-4 ${
                isUpcoming(event.startDate) ? 'border-l-primary-500' : 'border-l-gray-300'
              }`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="mb-3 sm:mb-0 sm:mr-4">
                          <div className="w-14 h-14 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600">
                            <Calendar size={24} />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {event.type}
                            </span>
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar size={14} className="mr-1" />
                              <span>{formatDate(event.startDate)}</span>
                              {event.endDate && event.startDate.split('T')[0] === event.endDate.split('T')[0] && (
                                <span> - {new Date(event.endDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin size={14} className="mr-1" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users size={14} className="mr-1" />
                              <span>{event.attendees} attendees</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex items-center">
                      {isUpcoming(event.startDate) && (
                        <Button
                          variant={user?.role === 'student' ? 'primary' : 'outline'}
                          size="sm"
                          className="mr-2"
                        >
                          {user?.role === 'student' ? 'RSVP' : 'Edit'}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<ChevronRight size={16} />}
                        iconPosition="right"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || typeFilter !== 'all' ? 
                'Try adjusting your search or filters.' : 
                'There are no events to display.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}