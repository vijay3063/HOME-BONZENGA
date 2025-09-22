import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Users,
  Search,
  Filter,
  Eye,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  X,
  AlertTriangle,
  Loader2,
  UserCheck,
  UserX,
  Shield,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  createdAt: string;
  lastLoginAt?: string;
  totalBookings: number;
  totalSpent: number;
  isVerified: boolean;
}

const UsersPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'CUSTOMER', label: 'Customers' },
    { value: 'VENDOR', label: 'Vendors' },
    { value: 'MANAGER', label: 'Managers' },
    { value: 'BEAUTICIAN', label: 'Beauticians' },
    { value: 'ADMIN', label: 'Admins' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'SUSPENDED', label: 'Suspended' },
    { value: 'PENDING', label: 'Pending' }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        // Fallback to mock data
        const mockUsers: User[] = [
          {
            id: '1',
            firstName: 'Emily',
            lastName: 'Davis',
            email: 'emily.davis@email.com',
            phone: '+1 (555) 123-4567',
            role: 'CUSTOMER',
            status: 'ACTIVE',
            createdAt: '2024-01-15T10:00:00Z',
            lastLoginAt: '2024-12-20T14:30:00Z',
            totalBookings: 8,
            totalSpent: 450,
            isVerified: true
          },
          {
            id: '2',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 987-6543',
            role: 'VENDOR',
            status: 'ACTIVE',
            createdAt: '2024-02-20T15:30:00Z',
            lastLoginAt: '2024-12-20T09:15:00Z',
            totalBookings: 0,
            totalSpent: 0,
            isVerified: true
          },
          {
            id: '3',
            firstName: 'Mike',
            lastName: 'Wilson',
            email: 'mike.wilson@email.com',
            role: 'MANAGER',
            status: 'ACTIVE',
            createdAt: '2024-01-10T08:00:00Z',
            lastLoginAt: '2024-12-20T16:45:00Z',
            totalBookings: 0,
            totalSpent: 0,
            isVerified: true
          },
          {
            id: '4',
            firstName: 'Lisa',
            lastName: 'Brown',
            email: 'lisa.brown@email.com',
            phone: '+1 (555) 456-7890',
            role: 'CUSTOMER',
            status: 'SUSPENDED',
            createdAt: '2024-03-05T12:00:00Z',
            lastLoginAt: '2024-12-15T10:20:00Z',
            totalBookings: 3,
            totalSpent: 180,
            isVerified: false
          }
        ];
        setUsers(mockUsers);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success(`User ${newStatus.toLowerCase()} successfully!`);
        fetchUsers(); // Refresh data
      } else {
        toast.error(`Failed to ${newStatus.toLowerCase()} user`);
      }
    } catch (error) {
      console.error(`Error updating user status:`, error);
      toast.error(`Failed to ${newStatus.toLowerCase()} user`);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'CUSTOMER':
        return 'bg-blue-100 text-blue-800';
      case 'VENDOR':
        return 'bg-green-100 text-green-800';
      case 'MANAGER':
        return 'bg-purple-100 text-purple-800';
      case 'BEAUTICIAN':
        return 'bg-orange-100 text-orange-800';
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div {...fadeInUp}>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#4e342e] mb-2">User Management</h1>
              <p className="text-[#6d4c41]">Manage all platform users and their accounts</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Badge className="bg-[#4e342e] text-white">
                {filteredUsers.length} Users
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <Card className="border-0 bg-white shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6d4c41] w-4 h-4" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-[#f8d7da] focus:border-[#4e342e] focus:ring-[#4e342e]/20"
                    />
                  </div>
                </div>
                <div>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-[#f8d7da] rounded-md focus:border-[#4e342e] focus:ring-[#4e342e]/20"
                  >
                    {roleOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-[#f8d7da] rounded-md focus:border-[#4e342e] focus:ring-[#4e342e]/20"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 bg-white shadow-lg animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-[#6d4c41]/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#4e342e] mb-2">No Users Found</h3>
                <p className="text-[#6d4c41]">
                  {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                    ? 'No users match your search criteria.' 
                    : 'No users have been registered yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center">
                              <User className="w-8 h-8 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-semibold text-[#4e342e]">
                                  {user.firstName} {user.lastName}
                                </h3>
                                {user.isVerified && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs">
                                    <Shield className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="space-y-1 text-sm text-[#6d4c41] mb-3">
                                <div className="flex items-center space-x-2">
                                  <Mail className="w-4 h-4" />
                                  <span>{user.email}</span>
                                </div>
                                {user.phone && (
                                  <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{user.phone}</span>
                                  </div>
                                )}
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>Joined {formatDate(user.createdAt)}</span>
                                </div>
                                {user.lastLoginAt && (
                                  <div className="flex items-center space-x-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Last login {formatDate(user.lastLoginAt)}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex-1">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-[#f8d7da]/20 rounded-lg">
                              <div className="text-lg font-semibold text-[#4e342e]">{user.totalBookings}</div>
                              <div className="text-xs text-[#6d4c41]">Bookings</div>
                            </div>
                            <div className="text-center p-3 bg-[#f8d7da]/20 rounded-lg">
                              <div className="text-lg font-semibold text-[#4e342e]">{formatCurrency(user.totalSpent)}</div>
                              <div className="text-xs text-[#6d4c41]">Total Spent</div>
                            </div>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex flex-col items-end space-y-3">
                          <div className="flex items-center space-x-2">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                          
                          <div className="flex space-x-2">
                            {user.status === 'ACTIVE' ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateUserStatus(user.id, 'SUSPENDED')}
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                <UserX className="w-3 h-3 mr-1" />
                                Suspend
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => updateUserStatus(user.id, 'ACTIVE')}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <UserCheck className="w-3 h-3 mr-1" />
                                Activate
                              </Button>
                            )}
                            
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;