export interface User {
  id: number;
  email: string;
  name: string;
}

export const authService = {
  async signup(data: any) {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async signin(data: any) {
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async signout() {
    await fetch('/api/auth/signout', { method: 'POST' });
  },

  async getMe() {
    const res = await fetch('/api/auth/me');
    if (!res.ok) return null;
    return res.json();
  },

  async registerEvent(eventId: string) {
    const res = await fetch('/api/events/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId }),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return res.json();
  },

  async getRegistrations() {
    const res = await fetch('/api/user/registrations');
    if (!res.ok) return [];
    const data = await res.json();
    return data.registrations;
  }
};
