import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { EVENTS } from '../constants';
import { Event } from '../types';
import { authService, User } from '../services/authService';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
};

interface EventsProps {
  user: User | null;
  registrations: string[];
  onRegister: () => void;
  onAuthRequired: () => void;
}

export const Events = ({ user, registrations, onRegister, onAuthRequired }: EventsProps) => {
  const [filter, setFilter] = useState<string>('All');
  const [isRegistering, setIsRegistering] = useState<string | null>(null);
  const categories = ['All', 'Technical', 'Non-Technical', 'Workshop'];

  const handleRegister = async (eventId: string) => {
    if (!user) {
      onAuthRequired();
      return;
    }

    setIsRegistering(eventId);
    try {
      await authService.registerEvent(eventId);
      onRegister();
    } catch (err: any) {
      alert(err.message || 'Registration failed');
    } finally {
      setIsRegistering(null);
    }
  };

  const filteredEvents = filter === 'All' 
    ? EVENTS 
    : EVENTS.filter(e => e.category === filter);

  return (
    <section id="events" className="py-24 bg-yukta-dark">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black mb-4 uppercase">
              The <span className="text-gradient">Lineup</span>
            </h2>
            <p className="text-white/50 max-w-md">
              From high-stakes coding battles to creative workshops, explore our diverse range of events.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === cat 
                    ? 'bg-yukta-primary text-yukta-dark' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass p-8 rounded-3xl group hover:neon-border transition-all duration-500 flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-yukta-primary/10 flex items-center justify-center text-yukta-primary group-hover:bg-yukta-primary group-hover:text-yukta-dark transition-colors duration-500">
                    <DynamicIcon name={event.icon} className="w-7 h-7" />
                  </div>
                  {event.prize && (
                    <div className="px-3 py-1 rounded-lg bg-yukta-secondary/20 text-yukta-secondary text-xs font-bold uppercase tracking-wider">
                      Prize: {event.prize}
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-yukta-primary transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">
                  {event.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <Icons.Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <Icons.Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-white/40">
                    <Icons.MapPin className="w-4 h-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleRegister(event.id)}
                  disabled={isRegistering === event.id || registrations.includes(event.id)}
                  className={`mt-8 w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    registrations.includes(event.id)
                      ? 'bg-yukta-primary/20 text-yukta-primary cursor-default'
                      : 'border border-white/10 hover:bg-white hover:text-yukta-dark'
                  }`}
                >
                  {isRegistering === event.id ? (
                    <Icons.Loader2 className="w-4 h-4 animate-spin" />
                  ) : registrations.includes(event.id) ? (
                    <>
                      <Icons.Check className="w-4 h-4" />
                      Registered
                    </>
                  ) : (
                    'Register Event'
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
