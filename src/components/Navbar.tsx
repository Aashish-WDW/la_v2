'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, User, Heart, MessageSquare, Home, Settings, LogOut, HelpCircle } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const isHomePage = true; // Assuming isHomePage is always true for this component

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const getTextColor = () => {
    if (isHomePage) {
      return isScrolled ? 'text-[#222222]' : 'text-white';
    }
    return 'text-[#222222]';
  };

  const getHoverColor = () => {
    if (isHomePage) {
      return isScrolled ? 'hover:text-[#717171]' : 'hover:text-white/80';
    }
    return 'hover:text-[#717171]';
  };

  const getProfileButtonStyle = () => {
    if (isHomePage) {
      return isScrolled
        ? 'border border-gray-200/50 hover:shadow-md bg-white/50 hover:bg-white'
        : 'border border-white/20 hover:bg-white/10';
    }
    return 'border border-gray-200 hover:shadow-md bg-white hover:bg-gray-50';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isHomePage
        ? (isScrolled ? 'bg-white/70 backdrop-blur-md' : 'bg-transparent')
        : 'bg-white'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={102}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${getTextColor()} ${getHoverColor()}`}>
              Home
            </Link>
            <Link href="/explore" className={`transition-colors ${getTextColor()} ${getHoverColor()}`}>
              Explore
            </Link>
            <Link href="/about" className={`transition-colors ${getTextColor()} ${getHoverColor()}`}>
              Host with us
            </Link>
          </div>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${getProfileButtonStyle()}`}
              >
                <Menu className={`w-5 h-5 ${getTextColor()}`} />
                <User className={`w-5 h-5 ${getTextColor()}`} />
              </button>

              {/* Profile Dropdown */}
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-50">
                  <div className="py-3">
                    <div className="px-4 pb-3">
                      <p className="text-sm font-medium text-gray-800">Welcome, Guest</p>
                      <p className="text-sm text-gray-500">Manage your account</p>
                    </div>
                    <div className="border-t" />
                    <Link
                      href="/profile"
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-800">Profile</span>
                    </Link>
                    <Link
                      href="/wishlist"
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      <Heart className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-800">Wishlist</span>
                    </Link>
                    <Link
                      href="/messages"
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-800">Messages</span>
                    </Link>
                    <Link
                      href="/host/dashboard"
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      <Home className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-800">Host Dashboard</span>
                    </Link>
                    <div className="border-t my-2" />
                    <Link
                      href="/settings"
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-800">Settings</span>
                    </Link>
                    <Link
                      href="/help"
                      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 transition-colors"
                    >
                      <HelpCircle className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-800">Help Center</span>
                    </Link>
                    <div className="border-t mt-2" />
                    <button
                      className="flex items-center gap-4 w-full px-4 py-3 hover:bg-gray-100 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-800">Log out</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-full transition-colors ${isHomePage
                ? (isScrolled ? 'hover:bg-white/50' : 'hover:bg-white/10')
                : 'hover:bg-gray-100'
              }`}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${getTextColor()}`} />
            ) : (
              <Menu className={`w-6 h-6 ${getTextColor()}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden transition-all duration-300 ${isHomePage
            ? (isScrolled ? 'bg-white/70 backdrop-blur-md' : 'bg-black/70 backdrop-blur-md')
            : 'bg-white'
          }`}>
          <div className="px-4 py-3 space-y-4">
            <Link
              href="/"
              className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                }`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                }`}
              onClick={toggleMenu}
            >
              Explore
            </Link>
            <Link
              href="/about"
              className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                }`}
              onClick={toggleMenu}
            >
              About
            </Link>
            <div className={`space-y-2 pt-4 border-t ${isScrolled ? 'border-gray-200/50' : 'border-white/10'
              }`}>
              <Link
                href="/profile"
                className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                  }`}
                onClick={toggleMenu}
              >
                Profile
              </Link>
              <Link
                href="/host/dashboard"
                className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                  }`}
                onClick={toggleMenu}
              >
                Host Dashboard
              </Link>
              <Link
                href="/host/become-host"
                className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                  }`}
                onClick={toggleMenu}
              >
                Become a Host
              </Link>
              <Link
                href="/messages"
                className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                  }`}
                onClick={toggleMenu}
              >
                Messages
              </Link>
              <Link
                href="/wishlist"
                className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                  }`}
                onClick={toggleMenu}
              >
                Wishlist
              </Link>
              <Link
                href="/help"
                className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                  }`}
                onClick={toggleMenu}
              >
                Help Center
              </Link>
              <Link
                href="/settings"
                className={`block py-2 transition-colors ${isScrolled ? 'text-[#222222] hover:text-[#717171]' : 'text-white hover:text-white/80'
                  }`}
                onClick={toggleMenu}
              >
                Settings
              </Link>
              <button
                className={`block w-full text-left py-2 transition-colors ${isScrolled ? 'text-red-600 hover:text-red-700' : 'text-red-400 hover:text-red-300'
                  }`}
                onClick={() => {
                  toggleMenu();
                  // Handle logout
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

