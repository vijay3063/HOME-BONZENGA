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
  Loader2,
  Shield
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
  managerApprovedAt?: string;
}

const BeauticianApprovalsPage = () => {
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
        const response = await fetch('http://localhost:3001/api/admin/beautician-approvals', {
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
            firstName: 'Emma',
            lastName: 'Wilson',
            email: 'emma.wilson@email.com',
            phone: '+1234567892',
            bio: 'Skincare specialist with extensive training in facial treatments and anti-aging therapies. Committed to providing exceptional service.',
            skills: ['Facial Treatments', 'Skincare Consultation', 'Anti-aging Treatments', 'Acne Treatment', 'Massage Therapy'],
            yearsOfExperience: '6-10 years',
            city: 'Chicago',
            address: '789 Pine St, Chicago, IL 60601',
            certifications: ['Licensed Esthetician', 'Advanced Skincare Specialist', 'Massage Therapy License'],
            status: 'PENDING_ADMIN_REVIEW',
            appliedAt: '2024-01-13T09:15:00Z',
            managerNotes: 'Excellent qualifications and experience. Recommended for approval.',
            managerApprovedAt: '2024-01-14T15:30:00Z'
          },
          {
            id: '2',
            firstName: 'Lisa',
            lastName: 'Chen',
            email: 'lisa.chen@email.com',
            phone: '+1234567893',
            bio: 'Professional hair stylist and makeup artist with expertise in bridal and special event styling.',
            skills: ['Bridal Hair & Makeup', 'Hair Styling', 'Makeup', 'Eyebrow Shaping', 'Eyelash Extensions'],
            yearsOfExperience: '3-5 years',
            city: 'San Francisco',
            address: '321 Elm St, San Francisco, CA 94102',
            certifications: ['Professional Hair Stylist', 'Bridal Makeup Specialist', 'Eyelash Extension Certified'],
            status: 'PENDING_ADMIN_REVIEW',
            appliedAt: '2024-01-12T11:45:00Z',
            managerNotes: 'Strong portfolio and client testimonials. Good communication skills.',
            managerApprovedAt: '2024-01-13T14:20:00Z'
          }
        ]);
    } catch (error) {
      console.error('Error fetching beautician applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalApproval = async (applicationId: string, action: 'approve' | 'reject') => {
    try {
      setIsReviewing(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3001/api/admin/beautician-approvals/${applicationId}/final-review`, {
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
                status: action === 'approve' ? 'APPROVED' : 'REJECTED',
                adminNotes: reviewNotes
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
            <p className="text-muted-foreground">Loading beautician approvals...</p>
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
            Final Beautician Approvals
          </h1>
          <p className="text-[#6d4c41] mt-2">
            Review and give final approval to beautician applications
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Demo Mode - Using mock data
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Final Review</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {applications.filter(app => app.status === 'PENDING_ADMIN_REVIEW').length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-blue-600/60" />
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

          <Card className="border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {applications.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600/60" />
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

                      {application.managerNotes && (
                        <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-[#4e342e] mb-1">Manager Notes</h4>
                          <p className="text-sm text-[#6d4c41]">{application.managerNotes}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          Applied: {new Date(application.appliedAt).toLocaleDateString()}
                        </div>
                        {application.managerApprovedAt && (
                          <div className="flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Manager Approved: {new Date(application.managerApprovedAt).toLocaleDateString()}
                          </div>
                        )}
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
                    
                    {application.status === 'PENDING_ADMIN_REVIEW' && (
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => setSelectedApplication(application)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Final Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Final Approval</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Are you sure you want to give final approval to this beautician? They will be added to the booking pool.</p>
                              <div>
                                <label className="text-sm font-medium">Admin Notes (Optional)</label>
                                <Textarea
                                  placeholder="Add any notes for the beautician..."
                                  value={reviewNotes}
                                  onChange={(e) => setReviewNotes(e.target.value)}
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">Cancel</Button>
                                <Button 
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleFinalApproval(application.id, 'approve')}
                                  disabled={isReviewing}
                                >
                                  {isReviewing ? 'Processing...' : 'Final Approve'}
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
                                  onClick={() => handleFinalApproval(application.id, 'reject')}
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

export default BeauticianApprovalsPage;
