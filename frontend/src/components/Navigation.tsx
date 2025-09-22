import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  User,
  LogOut,
  Search,
  Calendar
} from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import RoleNavigation from "./RoleNavigation";
import logo from "../assets/logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Main Navigation */}
      <nav className={`w-full px-4 lg:px-8 h-20 flex items-center justify-between transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-[#f8d7da]/30' 
          : 'bg-[#fdf6f0]/95 backdrop-blur-sm'
      }`}>
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Home Bonzenga Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-[#f8d7da] shadow-md"
            />
            <div>
              <h1 className="text-xl font-serif font-bold text-[#4e342e]">HOME BONZENGA</h1>
              <p className="text-xs text-[#6d4c41] leading-none font-sans">Premium Beauty Services</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {user ? (
            <RoleNavigation />
          ) : (
            <>
              <button 
                onClick={() => scrollToSection('home')}
                className="text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium text-sm relative group font-sans"
              >
                {t('nav.home')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f8d7da] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium text-sm relative group font-sans"
              >
                {t('nav.services')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f8d7da] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium text-sm relative group font-sans"
              >
                {t('nav.howItWorks')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f8d7da] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => scrollToSection('for-beauticians')}
                className="text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium text-sm relative group font-sans"
              >
                {t('nav.becomeBeautician')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f8d7da] transition-all duration-300 group-hover:w-full"></span>
              </button>
            </>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Language Toggle */}
          <LanguageToggle />
          {user ? (
            <div className="flex items-center space-x-2 pl-3 border-l border-[#f8d7da]/50">
              <span className="text-sm text-[#6d4c41] font-medium font-sans">
                {user.firstName}
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-[#4e342e] hover:text-[#6d4c41] hover:bg-[#f8d7da]/20 font-medium font-sans"
                >
                  {t('nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="sm" 
                  className="bg-[#4e342e] hover:bg-[#3b2c26] text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 font-sans"
                >
                  {t('nav.signup')}
                </Button>
              </Link>
            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-lg bg-[#f8d7da]/20 hover:bg-[#f8d7da]/30 transition-colors"
        >
          {isOpen ? <X className="w-5 h-5 text-[#4e342e]" /> : <Menu className="w-5 h-5 text-[#4e342e]" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#fdf6f0]/95 backdrop-blur-md shadow-xl border-b border-[#f8d7da]/30 lg:hidden">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation */}
            <div className="space-y-3">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full py-3 text-left text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium border-b border-[#f8d7da]/20 font-sans"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full py-3 text-left text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium border-b border-[#f8d7da]/20 font-sans"
              >
                {t('nav.services')}
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full py-3 text-left text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium border-b border-[#f8d7da]/20 font-sans"
              >
                {t('nav.howItWorks')}
              </button>
              <button 
                onClick={() => scrollToSection('for-beauticians')}
                className="block w-full py-3 text-left text-[#4e342e] hover:text-[#6d4c41] transition-colors font-medium font-sans"
              >
                {t('nav.becomeBeautician')}
              </button>
              
              {/* Mobile Language Toggle */}
              <div className="py-3 border-t border-[#f8d7da]/20">
                <LanguageToggle />
              </div>
            </div>

            {/* Mobile User Actions */}
            {user ? (
              <div className="pt-4 border-t border-[#f8d7da]/30 space-y-3">
                <RoleNavigation isMobile={true} />
                
                <div className="pt-3 border-t border-[#f8d7da]/30">
                  <span className="block text-sm text-[#6d4c41] mb-3 px-2 font-medium font-sans">
                    Welcome, {user.firstName}!
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full py-3 border-[#f8d7da]/50 text-[#4e342e] hover:bg-[#f8d7da]/20 font-sans"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('nav.logout')}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-[#f8d7da]/30 space-y-3">
                <Link to="/login" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full py-3 border-[#f8d7da]/50 text-[#4e342e] hover:bg-[#f8d7da]/20 font-sans"
                  >
                    {t('nav.login')}
                  </Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button className="w-full py-3 bg-[#4e342e] hover:bg-[#3b2c26] text-white rounded-xl shadow-lg font-sans">
                    {t('nav.signup')}
                  </Button>
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;