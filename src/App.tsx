/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Events } from './components/Events';
import { Schedule } from './components/Schedule';
import { Footer } from './components/Footer';
import { Assistant } from './components/Assistant';
import { AuthModal } from './components/AuthModal';
import { authService, User } from './services/authService';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [registrations, setRegistrations] = useState<string[]>([]);

  useEffect(() => {
    authService.getMe().then(data => {
      if (data?.user) {
        setUser(data.user);
        fetchRegistrations();
      }
    });
  }, []);

  const fetchRegistrations = async () => {
    const regs = await authService.getRegistrations();
    setRegistrations(regs);
  };

  const handleSignOut = async () => {
    await authService.signout();
    setUser(null);
    setRegistrations([]);
  };

  const handleRegisterClick = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      // Scroll to events or show dashboard
      document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-yukta-dark selection:bg-yukta-primary selection:text-yukta-dark">
      <Navbar user={user} onSignOut={handleSignOut} onSignIn={() => setIsAuthModalOpen(true)} />
      <main>
        <Hero onRegister={handleRegisterClick} />
        <Events user={user} registrations={registrations} onRegister={fetchRegistrations} onAuthRequired={() => setIsAuthModalOpen(true)} />
        <Schedule />
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-yukta-primary/5" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="glass p-12 md:p-20 rounded-[3rem] text-center border-yukta-primary/20">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                READY TO BE PART OF THE <br />
                <span className="text-gradient">FUTURE?</span>
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-12 text-lg">
                Limited slots available for technical workshops and hackathons. Secure your spot today and compete for prizes worth ₹1,00,000+.
              </p>
              <button 
                onClick={handleRegisterClick}
                className="px-12 py-5 bg-yukta-primary text-yukta-dark font-black rounded-2xl text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                REGISTER FOR YUKTA 2K26
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Assistant />
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(user) => {
          setUser(user);
          fetchRegistrations();
        }} 
      />
    </div>
  );
}
