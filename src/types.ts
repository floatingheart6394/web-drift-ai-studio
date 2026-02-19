export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Non-Technical' | 'Workshop';
  icon: string;
  prize?: string;
  date: string;
  time: string;
  venue: string;
}

export interface ScheduleItem {
  time: string;
  event: string;
  location: string;
}
