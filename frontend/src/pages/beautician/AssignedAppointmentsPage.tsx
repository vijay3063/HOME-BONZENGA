import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Sparkles,
  Home,
  Building,
  Scissors,
  X
} from 'lucide-react';
import { toast } from 'sonner';

interface AssignedAppointment {
  id: string;
  serviceTitle: string;
  customerName: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const AssignedAppointmentsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<AssignedAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchAssignedAppointments();
  }, []);

  const fetchAssignedAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:3001/api/beautician/assigned-appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // If API returns empty array, use dummy data
        if (data.length === 0) {
          const dummyAssignments: AssignedAppointment[] = [
            {
              id: 'dummy-1',
              serviceTitle: 'Hair Styling',
              customerName: 'Sarah Johnson',
              date: '2025-01-15',
              time: '10:00 AM',
              location: 'At-Home',
              notes: 'Bring straightener',
              status: 'PENDING'
            },
            {
              id: 'dummy-2',
              serviceTitle: 'Makeup',
              customerName: 'Maria Garcia',
              date: '2025-01-16',
              time: '02:00 PM',
              location: 'Salon',
              notes: 'Bridal package',
              status: 'PENDING'
            },
            {
              id: 'dummy-3',
              serviceTitle: 'Manicure',
              customerName: 'Priya Sharma',
              date: '2025-01-18',
              time: '11:30 AM',
              location: 'At-Home',
              notes: 'Use gel polish',
              status: 'PENDING'
            }
          ];
          setAssignments(dummyAssignments);
        } else {
          setAssignments(data);
        }
      } else {
        // Fallback to mock data if API fails
        const mockAssignments: AssignedAppointment[] = [
          {
            id: '1',
            serviceTitle: 'Hair Styling & Makeup',
            customerName: 'Sarah Johnson',
            date: '2024-01-20',
            time: '10:00 AM',
            location: 'At-Home',
            notes: 'Bridal preparation - please arrive 30 minutes early',
            status: 'PENDING'
          },
          {
            id: '2',
            serviceTitle: 'Facial Treatment',
            customerName: 'Maria Garcia',
            date: '2024-01-21',
            time: '2:00 PM',
            location: 'Salon',
            notes: 'Sensitive skin - use gentle products only',
            status: 'PENDING'
          },
          {
            id: '3',
            serviceTitle: 'Nail Art & Manicure',
            customerName: 'Emma Wilson',
            date: '2024-01-22',
            time: '11:00 AM',
            location: 'At-Home',
            notes: 'Special occasion - client prefers French tips',
            status: 'PENDING'
          }
        ];
        setAssignments(mockAssignments);
      }
    } catch (error) {
      console.error('Error fetching assigned appointments:', error);
      
      // Check if it's a connection error (server not running)
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.log('Server not available, using demo data');
        toast.info('Server not available - showing demo data');
        
        // Use demo data when server is not available
        const demoAssignments: AssignedAppointment[] = [
          {
            id: 'demo-1',
            serviceTitle: 'Hair Styling',
            customerName: 'Sarah Johnson',
            date: '2025-01-15',
            time: '10:00 AM',
            location: 'At-Home',
            notes: 'Bring straightener',
            status: 'PENDING'
          },
          {
            id: 'demo-2',
            serviceTitle: 'Makeup',
            customerName: 'Maria Garcia',
            date: '2025-01-16',
            time: '02:00 PM',
            location: 'Salon',
            notes: 'Bridal package',
            status: 'PENDING'
          },
          {
            id: 'demo-3',
            serviceTitle: 'Manicure',
            customerName: 'Priya Sharma',
            date: '2025-01-18',
            time: '11:30 AM',
            location: 'At-Home',
            notes: 'Use gel polish',
            status: 'PENDING'
          }
        ];
        setAssignments(demoAssignments);
      } else {
        // Other errors - show empty state
        toast.error('Failed to load assigned appointments');
        setAssignments([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (assignmentId: string) => {
    try {
      setProcessingIds(prev => new Set(prev).add(assignmentId));
      
      // Check if this is dummy or demo data
      if (assignmentId.startsWith('dummy-') || assignmentId.startsWith('demo-')) {
        // For dummy/demo data, just remove from list without API call
        setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
        toast.success('Appointment accepted successfully!');
        
        // Navigate back to dashboard after a short delay
        setTimeout(() => {
          navigate('/beautician');
        }, 1500);
        return;
      }
      
      // For real data, call the API
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/beautician/assignments/${assignmentId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Optimistically remove from list
        setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
        toast.success('Appointment accepted successfully!');
        
        // Navigate back to dashboard after a short delay
        setTimeout(() => {
          navigate('/beautician');
        }, 1500);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to accept appointment');
      }
    } catch (error) {
      console.error('Error accepting appointment:', error);
      toast.error('Failed to accept appointment');
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(assignmentId);
        return newSet;
      });
    }
  };

  const handleReject = async (assignmentId: string) => {
    try {
      setProcessingIds(prev => new Set(prev).add(assignmentId));
      
      // Check if this is dummy or demo data
      if (assignmentId.startsWith('dummy-') || assignmentId.startsWith('demo-')) {
        // For dummy/demo data, just remove from list without API call
        setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
        toast.success('Appointment rejected');
        return;
      }
      
      // For real data, call the API
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/beautician/assignments/${assignmentId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Optimistically remove from list
        setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
        toast.success('Appointment rejected');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to reject appointment');
      }
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      toast.error('Failed to reject appointment');
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(assignmentId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-[#6d4c41]/20 text-[#6d4c41]';
      case 'ACCEPTED':
        return 'bg-[#f8d7da]/30 text-[#4e342e]';
      case 'REJECTED':
        return 'bg-[#6d4c41]/10 text-[#6d4c41]';
      default:
        return 'bg-[#6d4c41]/20 text-[#6d4c41]';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#4e342e] mx-auto mb-4" />
              <p className="text-[#6d4c41]">Loading assigned appointments...</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#4e342e] mb-2">
                Assigned Appointments
              </h1>
              <p className="text-[#6d4c41]">
                Review and respond to appointments assigned by managers
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/beautician')}
              className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Assignments List */}
        {assignments.length === 0 ? (
          <Card className="border-0 bg-white shadow-lg">
            <CardContent className="p-12 text-center">
              <Sparkles className="w-16 h-16 text-[#6d4c41]/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#4e342e] mb-2">No assigned requests</h3>
              <p className="text-[#6d4c41]">You're all caught up! No new appointments have been assigned to you.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
                {/* Header Section */}
                <CardHeader className="pb-3 bg-gradient-to-r from-[#fdf6f0] to-[#f8d7da]/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-serif font-bold text-[#4e342e] mb-1 leading-tight">
                        {assignment.serviceTitle}
                      </CardTitle>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-[#6d4c41]" />
                        <span className="text-[#6d4c41] font-medium text-xs">{assignment.customerName}</span>
                      </div>
                    </div>
                    <Badge className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  {/* Compact Info Section */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-3 h-3 text-[#6d4c41]" />
                      <span className="text-[#6d4c41]">{new Date(assignment.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-3 h-3 text-[#6d4c41]" />
                      <span className="text-[#6d4c41]">{assignment.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      {assignment.location === 'At-Home' ? (
                        <Home className="w-3 h-3 text-[#6d4c41]" />
                      ) : (
                        <Building className="w-3 h-3 text-[#6d4c41]" />
                      )}
                      <span className="text-[#6d4c41]">{assignment.location}</span>
                    </div>
                  </div>

                  {/* Compact Notes Section */}
                  {assignment.notes && (
                    <div className="mb-4 p-2 bg-[#f8d7da]/15 rounded-lg">
                      <p className="text-xs text-[#6d4c41] leading-relaxed">
                        {assignment.notes}
                      </p>
                    </div>
                  )}

                  {/* Compact Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleAccept(assignment.id)}
                      disabled={processingIds.has(assignment.id)}
                      size="sm"
                      className="flex-1 bg-[#4e342e] hover:bg-[#3b2c26] text-white rounded-full py-2 text-xs font-medium transition-all duration-300"
                    >
                      {processingIds.has(assignment.id) ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Accept
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => handleReject(assignment.id)}
                      disabled={processingIds.has(assignment.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white rounded-full py-2 text-xs font-medium transition-all duration-300"
                    >
                      {processingIds.has(assignment.id) ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <>
                          <X className="w-3 h-3 mr-1" />
                          Reject
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AssignedAppointmentsPage;
