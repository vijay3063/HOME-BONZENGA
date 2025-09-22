import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle navigation after successful login
  useEffect(() => {
    if (user) {
      // Navigation is handled by AuthContext after successful login
      // No need for duplicate toast here as AuthContext already shows success message
      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "MANAGER") {
        navigate("/manager");
      } else if (user.role === "VENDOR") {
        navigate("/vendor");
      } else if (user.role === "BEAUTICIAN") {
        navigate("/beautician");
      } else {
        navigate("/customer");
      }
    }
  }, [user, navigate]);

const onSubmit = async (data: LoginFormData) => {
  setIsLoading(true);
  try {
    await login(data.email, data.password);
    // Navigation is handled by useEffect when user state updates
  } catch (error: unknown) {
    // Error toast is handled by AuthContext
    console.error('Login error:', error);
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-[#fdf6f0]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#f8d7da]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4e342e] to-[#6d4c41] rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold text-[#4e342e]">HOME BONZENGA</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-[#6d4c41] hover:text-[#4e342e] font-medium transition-colors">
                Home
              </Link>
              <Link to="/register" className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-serif font-bold text-[#4e342e] mb-4">Welcome Back</h1>
            <p className="text-lg text-[#6d4c41]">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <Card className="border-0 bg-white shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#fdf6f0] to-[#f8e8e0] p-8">
              <CardTitle className="text-2xl font-serif font-bold text-[#4e342e] text-center">Sign In to Your Account</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.email')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('auth.login.enterEmail')}
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('auth.login.password')}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('auth.login.enterPassword')}
                            {...field}
                            className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#4e342e] to-[#6d4c41] hover:from-[#3b2c26] hover:to-[#5a3520] text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-8 text-center">
                <p className="text-base text-[#6d4c41]">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-[#4e342e] hover:text-[#3b2c26] transition-colors"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>

              {/* Demo Accounts */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[#f8d7da]/20 to-[#fdf6f0] rounded-2xl border border-[#f8d7da]/30">
                <p className="text-sm font-semibold text-[#4e342e] mb-3">Demo Accounts</p>
                <div className="space-y-2 text-sm text-[#6d4c41]">
                  <div><strong>Admin:</strong> admin@homebonzenga.com / Admin@123</div>
                  <div><strong>Manager:</strong> manager@homebonzenga.com / Manager@123</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
