import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DashboardLayout from '@/components/DashboardLayout';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Star, 
  Upload, 
  Save, 
  Edit,
  X,
  Plus,
  Sparkles,
  Calendar,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface BeauticianProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  bio: string;
  yearsOfExperience: string;
  skills: string[];
  certifications: string[];
  profilePhoto?: string;
  averageRating: number;
  totalServices: number;
  totalEarnings: number;
  status: string;
}

const SKILLS_OPTIONS = [
  'Hair Styling & Cutting',
  'Hair Coloring & Highlights',
  'Hair Treatments',
  'Bridal Hair & Makeup',
  'Makeup Application',
  'Eyebrow Shaping',
  'Eyelash Extensions',
  'Facial Treatments',
  'Manicure & Pedicure',
  'Nail Art',
  'Massage Therapy',
  'Spa Treatments',
  'Skincare Consultation',
  'Anti-aging Treatments',
  'Acne Treatment',
  'Waxing Services',
  'Threading',
  'Henna Art',
  'Body Treatments',
  'Aromatherapy'
];

const BeauticianProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<BeauticianProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [certificationFiles, setCertificationFiles] = useState<File[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [user?.id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll use mock data
      const mockProfile: BeauticianProfile = {
        id: user?.id || 'mock-id',
        firstName: user?.firstName || 'Sarah',
        lastName: user?.lastName || 'Johnson',
        email: user?.email || 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        city: 'New York',
        address: '123 Beauty Street, Manhattan, NY 10001',
        bio: 'Professional beautician with over 5 years of experience in hair styling, makeup, and skincare. Specializing in bridal looks and special occasion makeup.',
        yearsOfExperience: '5-10 years',
        skills: ['Hair Styling & Cutting', 'Makeup Application', 'Bridal Hair & Makeup', 'Facial Treatments'],
        certifications: ['Certified Makeup Artist', 'Advanced Hair Styling', 'Skincare Specialist'],
        averageRating: 4.8,
        totalServices: 156,
        totalEarnings: 12450,
        status: 'APPROVED'
      };
      
      setProfile(mockProfile);
      setSelectedSkills(mockProfile.skills);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => {
      const newSkills = prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill];
      return newSkills;
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setCertificationFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setCertificationFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#4e342e] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#6d4c41]">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#6d4c41]">Profile not found</p>
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
              <h1 className="text-3xl font-serif font-bold text-[#4e342e]">Profile Management</h1>
              <p className="text-[#6d4c41] mt-2">Manage your beautician profile and settings</p>
            </div>
            <div className="flex items-center space-x-4">
              {!isEditing ? (
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-[#4e342e] hover:bg-[#3b2c26] text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                    className="border-[#4e342e] text-[#4e342e] hover:bg-[#4e342e] hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-[#4e342e] hover:bg-[#3b2c26] text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-[#4e342e]">
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center mx-auto mb-4">
                    {profile.profilePhoto ? (
                      <img 
                        src={profile.profilePhoto} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold text-white">
                        {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-[#4e342e] text-lg">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-[#6d4c41] capitalize">{profile.status.toLowerCase()}</p>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#fdf6f0] rounded-lg">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="text-sm text-[#6d4c41]">Rating</span>
                    </div>
                    <span className="font-semibold text-[#4e342e]">{profile.averageRating}/5.0</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#fdf6f0] rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm text-[#6d4c41]">Services</span>
                    </div>
                    <span className="font-semibold text-[#4e342e]">{profile.totalServices}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-[#fdf6f0] rounded-lg">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-[#6d4c41]">Earnings</span>
                    </div>
                    <span className="font-semibold text-[#4e342e]">${profile.totalEarnings}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-[#4e342e]">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6d4c41] mb-2">First Name</label>
                    {isEditing ? (
                      <Input 
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        className="border-[#4e342e]/20 focus:border-[#4e342e]"
                      />
                    ) : (
                      <p className="text-[#4e342e] font-medium">{profile.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#6d4c41] mb-2">Last Name</label>
                    {isEditing ? (
                      <Input 
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        className="border-[#4e342e]/20 focus:border-[#4e342e]"
                      />
                    ) : (
                      <p className="text-[#4e342e] font-medium">{profile.lastName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#6d4c41] mb-2">Email</label>
                    {isEditing ? (
                      <Input 
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="border-[#4e342e]/20 focus:border-[#4e342e]"
                      />
                    ) : (
                      <p className="text-[#4e342e] font-medium">{profile.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#6d4c41] mb-2">Phone</label>
                    {isEditing ? (
                      <Input 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="border-[#4e342e]/20 focus:border-[#4e342e]"
                      />
                    ) : (
                      <p className="text-[#4e342e] font-medium">{profile.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#6d4c41] mb-2">City</label>
                    {isEditing ? (
                      <Input 
                        value={profile.city}
                        onChange={(e) => setProfile({...profile, city: e.target.value})}
                        className="border-[#4e342e]/20 focus:border-[#4e342e]"
                      />
                    ) : (
                      <p className="text-[#4e342e] font-medium">{profile.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#6d4c41] mb-2">Years of Experience</label>
                    {isEditing ? (
                      <Select value={profile.yearsOfExperience} onValueChange={(value) => setProfile({...profile, yearsOfExperience: value})}>
                        <SelectTrigger className="border-[#4e342e]/20 focus:border-[#4e342e]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                          <SelectItem value="1-2 years">1-2 years</SelectItem>
                          <SelectItem value="3-5 years">3-5 years</SelectItem>
                          <SelectItem value="6-10 years">6-10 years</SelectItem>
                          <SelectItem value="11-15 years">11-15 years</SelectItem>
                          <SelectItem value="16-20 years">16-20 years</SelectItem>
                          <SelectItem value="More than 20 years">More than 20 years</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-[#4e342e] font-medium">{profile.yearsOfExperience}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#6d4c41] mb-2">Address</label>
                  {isEditing ? (
                    <Textarea 
                      value={profile.address}
                      onChange={(e) => setProfile({...profile, address: e.target.value})}
                      className="border-[#4e342e]/20 focus:border-[#4e342e]"
                      rows={3}
                    />
                  ) : (
                    <p className="text-[#4e342e] font-medium">{profile.address}</p>
                  )}
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-[#6d4c41] mb-2">Bio</label>
                  {isEditing ? (
                    <Textarea 
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      className="border-[#4e342e]/20 focus:border-[#4e342e]"
                      rows={4}
                    />
                  ) : (
                    <p className="text-[#4e342e] font-medium">{profile.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-[#4e342e]">
                  Skills & Specializations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      {SKILLS_OPTIONS.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`p-2 text-sm rounded-lg border transition-colors ${
                            selectedSkills.includes(skill)
                              ? 'bg-[#4e342e] text-white border-[#4e342e]'
                              : 'bg-white text-[#6d4c41] border-[#4e342e]/20 hover:border-[#4e342e]/40'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <Badge key={skill} className="bg-[#4e342e] text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <Badge key={skill} className="bg-[#4e342e] text-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-serif font-bold text-[#4e342e]">
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div>
                    <div className="mb-4">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="certification-upload"
                      />
                      <label
                        htmlFor="certification-upload"
                        className="inline-flex items-center px-4 py-2 border border-[#4e342e] text-[#4e342e] rounded-lg hover:bg-[#4e342e] hover:text-white transition-colors cursor-pointer"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Certifications
                      </label>
                    </div>
                    
                    {certificationFiles.length > 0 && (
                      <div className="space-y-2">
                        {certificationFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-[#fdf6f0] rounded-lg">
                            <span className="text-sm text-[#6d4c41]">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center p-3 bg-[#fdf6f0] rounded-lg">
                        <Award className="w-4 h-4 text-[#4e342e] mr-2" />
                        <span className="text-[#6d4c41]">{cert}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BeauticianProfilePage;
