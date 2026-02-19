import React from 'react';
import { Terminal, Github, Twitter, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="py-20 bg-yukta-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-yukta-primary rounded-lg flex items-center justify-center text-yukta-dark">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">YUKTA <span className="text-yukta-primary">2K26</span></span>
            </div>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
              Empowering the next generation of innovators through technology, creativity, and collaboration. Join us for an unforgettable experience.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-yukta-primary hover:text-yukta-dark transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-yukta-primary">Quick Links</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Events</a></li>
              <li><a href="#schedule" className="hover:text-white transition-colors">Schedule</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Registration</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-yukta-primary">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li>College Main Campus</li>
              <li>Block A, Innovation Lab</li>
              <li>contact@yukta2k26.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 font-mono">
          <p>© 2026 YUKTA SYMPOSIUM. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">PRIVACY POLICY</a>
            <a href="#" className="hover:text-white">TERMS OF SERVICE</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
