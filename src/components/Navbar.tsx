import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Terminal, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../services/authService';

interface NavbarProps {
  user: User | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

export const Navbar = ({ user, onSignOut, onSignIn }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Events', href: '#events' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-yukta-dark/80 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-yukta-primary rounded-lg flex items-center justify-center text-yukta-dark group-hover:rotate-12 transition-transform">
            <Terminal className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter">YUKTA <span className="text-yukta-primary">2K26</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-white/60 hover:text-yukta-primary transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yukta-primary/20 flex items-center justify-center text-yukta-primary">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-white/80">{user.name}</span>
              </div>
              <button 
                onClick={onSignOut}
                className="p-2 text-white/40 hover:text-red-400 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onSignIn}
              className="px-6 py-2.5 bg-white text-yukta-dark rounded-full font-bold text-sm hover:bg-yukta-primary transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-yukta-dark border-b border-white/10 p-6 md:hidden flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-white/60"
            >
              {link.name}
            </a>
          ))}
          <button className="w-full py-4 bg-yukta-primary text-yukta-dark rounded-xl font-bold">
            Register Now
          </button>
        </motion.div>
      )}
    </nav>
  );
};
