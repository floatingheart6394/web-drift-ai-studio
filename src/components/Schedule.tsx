import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Terminal } from 'lucide-react';

const schedule = [
  { time: '09:00 AM', event: 'Inauguration Ceremony', location: 'Main Auditorium' },
  { time: '10:30 AM', event: 'Technical Paper Presentation', location: 'Seminar Hall A' },
  { time: '12:00 PM', event: 'Lunch Break', location: 'College Canteen' },
  { time: '01:30 PM', event: 'Hackathon Kickoff', location: 'Innovation Lab' },
  { time: '03:00 PM', event: 'Guest Lecture: Future of AI', location: 'Main Auditorium' },
  { time: '05:00 PM', event: 'Day 1 Wrap-up', location: 'Open Ground' },
];

export const Schedule = () => {
  return (
    <section id="schedule" className="py-24 bg-yukta-dark relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black mb-4 uppercase">
            Event <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Plan your journey through the symposium. Don't miss out on the key highlights of Day 1.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {schedule.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-8 mb-8 group"
            >
              <div className="w-24 text-right hidden md:block">
                <span className="text-yukta-primary font-mono font-bold text-lg">{item.time}</span>
              </div>
              
              <div className="relative flex-grow glass p-6 rounded-2xl group-hover:neon-border transition-all">
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-yukta-dark border-2 border-yukta-primary rounded-full z-10 hidden md:block" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.event}</h4>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <span className="text-yukta-primary font-mono font-bold">{item.time}</span>
                  </div>
                  <button className="text-xs font-bold uppercase tracking-widest text-yukta-primary hover:text-white transition-colors">
                    Remind Me
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
