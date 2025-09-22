import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Calendar,
  Users,
  Building,
  DollarSign,
  Settings,
  LogOut,
  Package,
  UserCheck,
  BarChart3,
  Scissors,
  Sparkles,
  User as UserIcon,
  AlertCircle
} from 'lucide-react';

interface RoleNavigationProps {
  isMobile?: boolean;
}

const RoleNavigation: React.FC<RoleNavigationProps> = ({ isMobile = false }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;


  const dashboardLinks = {
    CUSTOMER: [
      { path: '/', label: t('nav.home'), icon: Home },
      { path: '/at-home-services', label: t('nav.atHomeServices'), icon: Home },
      { path: '/salon-visit', label: t('nav.salonVisit'), icon: Building },
      { path: '/customer', label: t('nav.dashboard'), icon: UserIcon },
      { path: '/customer/profile', label: t('nav.profile'), icon: Settings },
      { path: '/customer/bookings', label: t('nav.appointments'), icon: Calendar },
    ],
    VENDOR: [
      { path: '/vendor', label: t('nav.dashboard'), icon: Building },
      { path: '/vendor/appointments', label: t('nav.appointments'), icon: Calendar },
      { path: '/vendor/services', label: t('nav.services'), icon: Scissors },
      { path: '/vendor/revenue', label: t('nav.revenue'), icon: DollarSign },
      { path: '/vendor/profile', label: t('nav.profile'), icon: Settings },
    ],
    BEAUTICIAN: [
      { path: '/beautician', label: t('nav.dashboard'), icon: Scissors },
      { path: '/beautician/appointments', label: t('nav.assignedAppointments'), icon: Calendar },
      { path: '/beautician/earnings', label: t('nav.earnings'), icon: DollarSign },
      { path: '/beautician/profile', label: t('nav.profile'), icon: Settings },
    ],
    MANAGER: [
      { path: '/manager', label: t('nav.dashboard'), icon: UserCheck },
      { path: '/manager/vendors', label: t('nav.vendors'), icon: Building },
      { path: '/manager/pending-vendors', label: t('nav.pendingVendors'), icon: AlertCircle },
      { path: '/manager/appointments', label: t('nav.appointments'), icon: Calendar },
      { path: '/manager/reports', label: t('nav.reports'), icon: BarChart3 },
    ],
    ADMIN: [
      { path: '/admin', label: t('nav.dashboard'), icon: Settings },
      { path: '/admin/users', label: t('nav.users'), icon: Users },
      { path: '/admin/vendors', label: t('nav.vendors'), icon: Building },
      { path: '/admin/managers', label: t('nav.managers'), icon: UserCheck },
      { path: '/admin/financials', label: t('nav.financials'), icon: DollarSign },
      { path: '/admin/reports', label: t('nav.reports'), icon: BarChart3 },
      { path: '/admin/settings', label: t('nav.settings'), icon: Settings },
    ],
  };

  const currentRoleLinks = dashboardLinks[user.role as keyof typeof dashboardLinks] || [];

  if (isMobile) {
    return (
      <div className="space-y-3">
        {/* Role-specific dashboard links */}
        {currentRoleLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="flex items-center w-full py-3 px-4 text-[#4e342e] hover:bg-[#f8d7da]/20 rounded-lg transition-colors font-medium font-sans"
          >
            <link.icon className="w-4 h-4 mr-2" />
            {link.label}
          </Link>
        ))}
        
        {/* Logout button */}
        <button
          onClick={logout}
          className="flex items-center w-full py-3 px-4 text-[#4e342e] hover:bg-[#f8d7da]/20 rounded-lg transition-colors font-medium font-sans"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t('nav.logout')}
        </button>
      </div>
    );
  }

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {/* Role-specific dashboard links */}
      {currentRoleLinks.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className="text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium text-sm relative group font-sans"
        >
          {link.label}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f8d7da] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
      
      {/* Logout button */}
      <button
        onClick={logout}
        className="text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium text-sm relative group font-sans"
      >
        {t('nav.logout')}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f8d7da] transition-all duration-300 group-hover:w-full"></span>
      </button>
    </nav>
  );
};

export default RoleNavigation;