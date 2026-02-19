import { Event } from './types';

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Code-A-Thon',
    description: 'A 12-hour intense hackathon to solve real-world problems using cutting-edge technologies.',
    category: 'Technical',
    icon: 'Code',
    prize: '₹25,000',
    date: 'March 15, 2026',
    time: '09:00 AM',
    venue: 'Main Lab'
  },
  {
    id: '2',
    title: 'Paper Presentation',
    description: 'Present your research and innovative ideas in front of an expert panel.',
    category: 'Technical',
    icon: 'FileText',
    prize: '₹10,000',
    date: 'March 15, 2026',
    time: '11:00 AM',
    venue: 'Seminar Hall A'
  },
  {
    id: '3',
    title: 'AI Workshop',
    description: 'Hands-on session on Generative AI and LLM integration in modern apps.',
    category: 'Workshop',
    icon: 'Cpu',
    date: 'March 16, 2026',
    time: '10:00 AM',
    venue: 'Auditorium'
  },
  {
    id: '4',
    title: 'Gaming Hub',
    description: 'Valorant and FIFA tournament for the ultimate gamers.',
    category: 'Non-Technical',
    icon: 'Gamepad2',
    prize: '₹15,000',
    date: 'March 16, 2026',
    time: '02:00 PM',
    venue: 'Student Lounge'
  },
  {
    id: '5',
    title: 'Robo-Race',
    description: 'Design a bot that can navigate through a complex obstacle course in minimum time.',
    category: 'Technical',
    icon: 'Bot',
    prize: '₹20,000',
    date: 'March 15, 2026',
    time: '01:00 PM',
    venue: 'Open Ground'
  }
];
