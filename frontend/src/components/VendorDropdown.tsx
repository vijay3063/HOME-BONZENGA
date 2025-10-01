import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { ChevronDown, User, LogOut } from 'lucide-react';

interface VendorDropdownProps {
  vendorName: string;
}

const VendorDropdown: React.FC<VendorDropdownProps> = ({ vendorName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };


  const handleProfile = () => {
    navigate('/vendor/profile');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-[#6d4c41] font-medium font-sans hover:text-[#4e342e] transition-colors"
      >
        <span>{vendorName}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#f8d7da]/30 py-2 z-50">
          <button
            onClick={handleProfile}
            className="flex items-center w-full px-4 py-3 text-sm text-[#4e342e] hover:bg-[#f8d7da]/20 transition-colors font-medium font-sans"
          >
            <User className="w-4 h-4 mr-3" />
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm text-[#4e342e] hover:bg-[#f8d7da]/20 transition-colors font-medium font-sans"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorDropdown;
