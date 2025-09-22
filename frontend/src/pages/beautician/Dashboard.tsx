import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Calendar, 
  Users, 
  Star, 
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  Settings,
  LogOut,
  Sparkles,
  Home,
  DollarSign,
  Loader2,
  CheckCircle
} from 'lucide-react';

interface BeauticianStats {
  upcomingAppointments: number;
  completedServices: number;
  totalEarnings: number;
}

interface Appointment {
  id: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  total: number;
  customer: {
    firstName: string;
    lastName: string;
  };
  vendor: {
    shopName: string;
  };
  items: Array<{
    service: {
      name: string;
    };
  }>;
}

const BeauticianDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<BeauticianStats | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchBeauticianData();
    }
  }, [user?.id]);

  const fetchBeauticianData = async () => {
    try {
      setLoading(true);
      
      // Use mock data instead of API calls
      const mockData = await import('@/mockData/beauticians.json');
      const beauticianData = mockData.default.beauticians.find(b => b.status === 'approved') || mockData.default.beauticians[0];
      
      // Set stats from mock data
      setStats({
        upcomingAppointments: beauticianData.appointments.filter(a => a.status === 'confirmed').length,
        completedServices: beauticianData.appointments.filter(a => a.status === 'completed').length,
        totalEarnings: beauticianData.totalEarnings,
        averageRating: beauticianData.averageRating
      });

      // Set appointments from mock data
      setAppointments(beauticianData.appointments.map(appointment => ({
        id: appointment.id,
        service: appointment.service,
        client: appointment.customerName,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status,
        location: 'At-Home',
        total: appointment.total
      })));
    } catch (error) {
      console.error('Error loading mock data:', error);
      // Fallback to empty data
      setStats({
        upcomingAppointments: 0,
        completedServices: 0,
        totalEarnings: 0,
        averageRating: 0
      });
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const recentBookings = [
    {
      id: '1',
      service: 'Hair Styling',
      client: 'Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'Confirmed',
      location: 'At-Home'
    },
    {
      id: '2',
      service: 'Makeup',
      client: 'Maria Garcia',
      date: '2024-01-16',
      time: '2:00 PM',
      status: 'Pending',
      location: 'Salon'
    },
    {
      id: '3',
      service: 'Facial Treatment',
      client: 'Emma Wilson',
      date: '2024-01-17',
      time: '11:00 AM',
      status: 'Completed',
      location: 'At-Home'
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading beautician dashboard...</p>
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
              <h1 className="text-3xl font-serif font-bold text-[#4e342e]">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-[#6d4c41] mt-2">
                Here's your beautician dashboard overview
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#6d4c41]">Upcoming Appointments</p>
                    <p className="text-2xl font-bold text-[#4e342e]">{stats.upcomingAppointments}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#6d4c41]">Completed Services</p>
                    <p className="text-2xl font-bold text-[#4e342e]">{stats.completedServices}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#6d4c41]">Total Earnings</p>
                    <p className="text-2xl font-bold text-[#4e342e]">${stats.totalEarnings}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#6d4c41]">Average Rating</p>
                    <p className="text-2xl font-bold text-[#4e342e]">4.8</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-[#4e342e] flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-[#fdf6f0] rounded-lg hover:bg-[#f8d7da]/20 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#4e342e]">{booking.service}</h4>
                          <p className="text-sm text-[#6d4c41]">{booking.client}</p>
                          <div className="flex items-center space-x-4 text-xs text-[#6d4c41] mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {booking.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {booking.time}
                            </span>
                            <span className="flex items-center">
                              {booking.location === 'At-Home' ? (
                                <Home className="w-3 h-3 mr-1" />
                              ) : (
                                <MapPin className="w-3 h-3 mr-1" />
                              )}
                              {booking.location}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-[#4e342e]">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#4e342e]">{user?.firstName} {user?.lastName}</h3>
                  <p className="text-sm text-[#6d4c41] capitalize">{user?.role?.toLowerCase()}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-[#6d4c41] mr-2" />
                    <span className="text-[#6d4c41]">{user?.email}</span>
                  </div>
                  {user?.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-[#6d4c41] mr-2" />
                      <span className="text-[#6d4c41]">{user.phone}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-[#4e342e]">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-[#4e342e] hover:bg-[#3b2c26] text-white justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Button>
                  <Button variant="outline" className="w-full border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Client History
                  </Button>
                  <Button variant="outline" className="w-full border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white justify-start">
                    <Star className="w-4 h-4 mr-2" />
                    Reviews
                  </Button>
                  <Button variant="outline" className="w-full border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Earnings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BeauticianDashboard;
