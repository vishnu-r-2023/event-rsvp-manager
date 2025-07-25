'use client';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

const CreateEvent = () => {
  const { data: session } = useSession();
  const [adminId, setAdminId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [users, setUsers] = useState([]);
  const [guests, setGuests] = useState([]); // [{ email, rsvp }]
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch adminId from session email
  useEffect(() => {
    if (!session?.user?.email) return;
    fetch('/api/users')
      .then((res) => res.json())
      .then((users) => {
        const admin = users.find(u => u.email === session.user.email);
        if (admin) setAdminId(admin._id);
        setUsers(users);
      });
  }, [session]);

  const handleGuestChange = (email, rsvp) => {
    setGuests((prev) => {
      const exists = prev.find((g) => g.email === email);
      if (exists) {
        return prev.map((g) => g.email === email ? { ...g, rsvp } : g);
      } else {
        return [...prev, { email, rsvp }];
      }
    });
  };

  const handleGuestToggle = (email) => {
    setGuests((prev) => {
      if (prev.find((g) => g.email === email)) {
        return prev.filter((g) => g.email !== email);
      } else {
        return [...prev, { email, rsvp: 'Maybe' }];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const event = {
      title,
      description,
      date,
      createdBy: adminId,
      guests,
    };
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTitle(''); setDescription(''); setDate(''); setGuests([]);
    }
  };

  return (
    <div className="create-event-container">
      <h2 className="create-event-title">Create New Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        <label>Title:
          <input className="input-field" value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
        <label>Description:
          <input className="input-field" value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label>Date:
          <input className="input-field" type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </label>

        <h4>Select Guests:</h4>
        <ul className="guest-list">
          {users.map(user => (
            <li key={user.email} className="guest-item">
              <label>
                <input
                  type="checkbox"
                  checked={!!guests.find(g => g.email === user.email)}
                  onChange={() => handleGuestToggle(user.email)}
                />
                {user.name} ({user.email})
              </label>
              {guests.find(g => g.email === user.email) && (
                <select
                  className="rsvp-dropdown"
                  value={guests.find(g => g.email === user.email)?.rsvp || 'Maybe'}
                  onChange={e => handleGuestChange(user.email, e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">Maybe</option>
                </select>
              )}
            </li>
          ))}
        </ul>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
      {success && <div className="success-message">Event created successfully!</div>}
    </div>
  );
};

export default CreateEvent;
