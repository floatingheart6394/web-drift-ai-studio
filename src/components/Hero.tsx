import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

interface HeroProps {
  onRegister: () => void;
}

export const Hero = ({ onRegister }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yukta-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-yukta-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-mono font-bold tracking-widest uppercase border border-yukta-primary/30 rounded-full bg-yukta-primary/10 text-yukta-primary">
            National Level Technical Symposium
          </span>
          
          <h1 className="text-7xl md:text-9xl font-black mb-6 leading-none">
            YUKTA <span className="text-gradient">2K26</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Unleashing Innovation, Empowering Minds. Join the biggest gathering of tech enthusiasts this spring.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRegister}
              className="px-8 py-4 bg-yukta-primary text-yukta-dark font-black rounded-xl flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass text-white font-bold rounded-xl"
            >
              View Events
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yukta-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Date</p>
              <p className="font-display font-medium">March 15-16, 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-yukta-primary" />
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Location</p>
              <p className="font-display font-medium">College Campus, Block A</p>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <div className="text-yukta-primary font-bold text-xl">25+</div>
            </div>
            <div className="text-left">
              <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Activities</p>
              <p className="font-display font-medium">Events & Workshops</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
      >
        <div className="w-1 h-2 bg-yukta-primary rounded-full" />
      </motion.div>
    </section>
  );
};
