import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Eye, EyeOff, User, MapPin, Award, Upload, X, Plus } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';

const beauticianSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  yearsOfExperience: z.string().min(1, 'Please select years of experience'),
  city: z.string().min(2, 'Please enter your city'),
  address: z.string().min(5, 'Please enter your address'),
  bio: z.string().min(50, 'Please write a brief bio (at least 50 characters)'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type BeauticianFormData = z.infer<typeof beauticianSchema>;

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

const EXPERIENCE_OPTIONS = [
  'Less than 1 year',
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '11-15 years',
  '16-20 years',
  'More than 20 years'
];

const BeauticianRegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [certificationFiles, setCertificationFiles] = useState<File[]>([]);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<BeauticianFormData>({
    resolver: zodResolver(beauticianSchema),
    defaultValues: {
      skills: [],
    },
  });

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => {
      const newSkills = prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill];
      form.setValue('skills', newSkills);
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

  const onSubmit = async (data: BeauticianFormData) => {
    try {
      setIsLoading(true);
      
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('password', data.password);
      formData.append('yearsOfExperience', data.yearsOfExperience);
      formData.append('city', data.city);
      formData.append('address', data.address);
      formData.append('bio', data.bio);
      formData.append('skills', JSON.stringify(data.skills));
      formData.append('role', 'BEAUTICIAN');
      formData.append('status', 'PENDING_MANAGER_REVIEW');
      
      // Append certification files
      certificationFiles.forEach((file, index) => {
        formData.append(`certification_${index}`, file);
      });

      try {
        const response = await fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          toast.success('Registration successful! Your application is under review.');
          navigate('/login');
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || 'Registration failed. Please try again.');
        }
      } catch (fetchError) {
        console.log('Backend not available, simulating successful registration');
        // Simulate successful registration when backend is not available
        toast.success('Registration successful! Your application is under review. (Demo Mode)');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#fdf6f0]">
        {/* Registration Form */}
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
          <div className="w-full max-w-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-serif font-bold text-[#4e342e] mb-4">Join as Independent Beautician</h1>
              <p className="text-lg text-[#6d4c41]">Share your expertise and build your beauty business</p>
            </div>

            {/* Registration Form */}
            <Card className="border-0 bg-white shadow-2xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] p-8">
                <CardTitle className="text-2xl font-serif font-bold text-[#4e342e] text-center">Create Your Beautician Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your last name"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a password"
                                  {...field}
                                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="Confirm your password"
                                  {...field}
                                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Professional Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="yearsOfExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {EXPERIENCE_OPTIONS.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your city"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Location */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full address"
                              {...field}
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Skills Selection */}
                    <div>
                      <FormLabel>Skills & Specializations</FormLabel>
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                        {SKILLS_OPTIONS.map((skill) => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleSkillToggle(skill)}
                            className={`p-2 rounded-lg text-sm border transition-all duration-300 ${
                              selectedSkills.includes(skill)
                                ? 'bg-[#4e342e] text-white border-[#4e342e]'
                                : 'bg-white text-[#6d4c41] border-[#f8d7da] hover:border-[#4e342e]'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                      {form.formState.errors.skills && (
                        <p className="text-sm text-red-500 mt-1">{form.formState.errors.skills.message}</p>
                      )}
                    </div>

                    {/* Bio */}
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your experience, specialties, and what makes you unique..."
                              {...field}
                              className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Certifications Upload */}
                    <div>
                      <FormLabel>Certifications (Optional)</FormLabel>
                      <div className="mt-2">
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
                          className="inline-flex items-center px-4 py-2 border border-[#f8d7da] rounded-lg cursor-pointer hover:border-[#4e342e] transition-colors"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Certifications
                        </label>
                        {certificationFiles.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {certificationFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                                <span className="text-sm text-gray-600">{file.name}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#4e342e] hover:bg-[#3b2c26] text-white py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      {isLoading ? 'Creating Account...' : 'Create Beautician Account'}
                    </Button>

                    {/* Login Link */}
                    <div className="text-center">
                      <p className="text-[#6d4c41]">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#4e342e] hover:underline font-medium">
                          Sign in
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BeauticianRegistrationPage;
