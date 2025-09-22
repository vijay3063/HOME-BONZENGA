import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  Calendar, 
  Users, 
  Star, 
  MapPin,
  Phone,
  Mail,
  Award,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Clock,
  User,
  Loader2
} from 'lucide-react';

interface BeauticianApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  yearsOfExperience: string;
  city: string;
  address: string;
  certifications: string[];
  status: 'PENDING_MANAGER_REVIEW' | 'PENDING_ADMIN_REVIEW' | 'APPROVED' | 'REJECTED';
  appliedAt: string;
  managerNotes?: string;
  adminNotes?: string;
}

const BeauticianApplicationsPage = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<BeauticianApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<BeauticianApplication | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    fetchBeauticianApplications();
  }, []);

  const fetchBeauticianApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      try {
        const response = await fetch('http://localhost:3001/api/manager/beautician-applications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setApplications(data.applications || []);
          return;
        }
      } catch (fetchError) {
        console.log('Backend not available, using mock data');
      }
      
      // Mock data for demo
      setApplications([
          {
            id: '1',
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1234567890',
            bio: 'Professional beautician with 5+ years of experience in hair styling, makeup, and skincare treatments. Passionate about helping clients look and feel their best.',
            skills: ['Hair Styling', 'Makeup', 'Facial Treatments', 'Manicure', 'Bridal Hair & Makeup'],
            yearsOfExperience: '5-10 years',
            city: 'New York',
            address: '123 Main St, New York, NY 10001',
            certifications: ['Certified Hair Stylist', 'Professional Makeup Artist', 'Skincare Specialist'],
            status: 'PENDING_MANAGER_REVIEW',
            appliedAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            firstName: 'Maria',
            lastName: 'Garcia',
            email: 'maria.garcia@email.com',
            phone: '+1234567891',
            bio: 'Experienced beautician specializing in bridal makeup and hair styling. Trained in the latest techniques and trends.',
            skills: ['Bridal Hair & Makeup', 'Hair Styling', 'Makeup', 'Eyebrow Shaping'],
            yearsOfExperience: '3-5 years',
            city: 'Los Angeles',
            address: '456 Oak Ave, Los Angeles, CA 90210',
            certifications: ['Bridal Makeup Specialist', 'Hair Styling Certificate'],
            status: 'PENDING_MANAGER_REVIEW',
            appliedAt: '2024-01-14T14:20:00Z'
          },
          {
            id: '3',
            firstName: 'Emma',
            lastName: 'Wilson',
            email: 'emma.wilson@email.com',
            phone: '+1234567892',
            bio: 'Skincare specialist with extensive training in facial treatments and anti-aging therapies.',
            skills: ['Facial Treatments', 'Skincare Consultation', 'Anti-aging Treatments', 'Acne Treatment'],
            yearsOfExperience: '6-10 years',
            city: 'Chicago',
            address: '789 Pine St, Chicago, IL 60601',
            certifications: ['Licensed Esthetician', 'Advanced Skincare Specialist'],
            status: 'PENDING_ADMIN_REVIEW',
            appliedAt: '2024-01-13T09:15:00Z',
            managerNotes: 'Excellent qualifications and experience. Recommended for approval.'
          }
        ]);
    } catch (error) {
      console.error('Error fetching beautician applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (applicationId: string, action: 'approve' | 'reject') => {
    try {
      setIsReviewing(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/manager/beautician-applications/${applicationId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action,
          notes: reviewNotes
        })
      });
      
      if (response.ok) {
        // Update local state
        setApplications(prev => prev.map(app => 
          app.id === applicationId 
            ? { 
                ...app, 
                status: action === 'approve' ? 'PENDING_ADMIN_REVIEW' : 'REJECTED',
                managerNotes: reviewNotes
              }
            : app
        ));
        setReviewNotes('');
        setSelectedApplication(null);
      }
    } catch (error) {
      console.error('Error reviewing application:', error);
    } finally {
      setIsReviewing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING_MANAGER_REVIEW':
        return 'bg-yellow-100 text-yellow-800';
      case 'PENDING_ADMIN_REVIEW':
        return 'bg-blue-100 text-blue-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Loading beautician applications...</p>
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
          <h1 className="text-3xl font-serif font-bold text-[#4e342e]">
            Beautician Applications
          </h1>
          <p className="text-[#6d4c41] mt-2">
            Review and approve beautician applications
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Demo Mode - Using mock data
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {applications.filter(app => app.status === 'PENDING_MANAGER_REVIEW').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Admin Review</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {applications.filter(app => app.status === 'PENDING_ADMIN_REVIEW').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applications.filter(app => app.status === 'APPROVED').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {applications.filter(app => app.status === 'REJECTED').length}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-red-600/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map((application) => (
            <Card key={application.id} className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {application.firstName.charAt(0)}{application.lastName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#4e342e]">
                          {application.firstName} {application.lastName}
                        </h3>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.replace('_', ' ').toLowerCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-[#6d4c41]">
                            <Mail className="w-4 h-4 mr-2" />
                            {application.email}
                          </div>
                          <div className="flex items-center text-sm text-[#6d4c41]">
                            <Phone className="w-4 h-4 mr-2" />
                            {application.phone}
                          </div>
                          <div className="flex items-center text-sm text-[#6d4c41]">
                            <MapPin className="w-4 h-4 mr-2" />
                            {application.city}
                          </div>
                          <div className="flex items-center text-sm text-[#6d4c41]">
                            <Award className="w-4 h-4 mr-2" />
                            {application.yearsOfExperience}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-[#4e342e] mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {application.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-[#6d4c41] mb-3">{application.bio}</p>
                      
                      {application.certifications.length > 0 && (
                        <div className="mb-3">
                          <h4 className="font-semibold text-[#4e342e] mb-1">Certifications</h4>
                          <div className="space-y-1">
                            {application.certifications.map((cert, index) => (
                              <div key={index} className="flex items-center text-sm text-[#6d4c41]">
                                <FileText className="w-3 h-3 mr-1" />
                                {cert}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        Applied on {new Date(application.appliedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Application Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Full Name</label>
                              <p className="text-sm text-gray-600">
                                {application.firstName} {application.lastName}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Experience</label>
                              <p className="text-sm text-gray-600">{application.yearsOfExperience}</p>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Address</label>
                            <p className="text-sm text-gray-600">{application.address}</p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium">Bio</label>
                            <p className="text-sm text-gray-600">{application.bio}</p>
                          </div>
                          
                          {application.managerNotes && (
                            <div>
                              <label className="text-sm font-medium">Manager Notes</label>
                              <p className="text-sm text-gray-600">{application.managerNotes}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {application.status === 'PENDING_MANAGER_REVIEW' && (
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Approve Application</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Are you sure you want to approve this application? It will be forwarded to admin for final review.</p>
                              <div>
                                <label className="text-sm font-medium">Notes (Optional)</label>
                                <Textarea
                                  placeholder="Add any notes for the admin review..."
                                  value={reviewNotes}
                                  onChange={(e) => setReviewNotes(e.target.value)}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleReview(application.id, 'approve')}
                                  disabled={isReviewing}
                                >
                                  {isReviewing ? 'Processing...' : 'Approve'}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Application</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Are you sure you want to reject this application?</p>
                              <div>
                                <label className="text-sm font-medium">Reason for Rejection</label>
                                <Textarea
                                  placeholder="Please provide a reason for rejection..."
                                  value={reviewNotes}
                                  onChange={(e) => setReviewNotes(e.target.value)}
                                  required
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  variant="destructive"
                                  onClick={() => handleReview(application.id, 'reject')}
                                  disabled={isReviewing || !reviewNotes.trim()}
                                >
                                  {isReviewing ? 'Processing...' : 'Reject'}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BeauticianApplicationsPage;
