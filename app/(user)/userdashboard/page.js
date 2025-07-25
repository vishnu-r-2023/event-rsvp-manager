'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const UserDashboard=()=>{
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('/api/events');
      const data = await res.json();
      // Filter events where the logged-in user is a guest
      if (session?.user?.email && Array.isArray(data)) {
        setEvents(data.filter(event => event.guests.some(g => g.email === session.user.email)));
      } else {
        setEvents([]);
        if (data && typeof data === 'object' && data.error) {
          console.error('API error:', data.error);
        }
      }
    };
    fetchEvents();
  }, [session]);

  const [rsvpedEvents, setRsvpedEvents] = useState([]);

  const handleRSVP = async (eventId, rsvp) => {
    // Find the event and update the RSVP for this user
    const event = events.find(e => e._id === eventId);
    if (!event) return;
    const updatedEvent = { ...event };
    updatedEvent.guests = updatedEvent.guests.map(g =>
      g.email === session?.user?.email ? { ...g, rsvp } : g
    );
    const res = await fetch(`/api/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    });
    const data = await res.json();
    if (data._id) {
      setEvents(events.map(e => e._id === eventId ? data : e));
      setRsvpedEvents(prev => [...prev, eventId]);
      alert('RSVP Updated!');
    }
  };

  return (
    <div>
    <h1 className="dashboard-title" style={{textAlign:"center",marginTop:"120px"}}>Events for You</h1>
    <div className="dashboard-wrapper">
    <div className="event-grid">
    {events.map((event) => (
        <div key={event._id} className="event-card">
        <div>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">{event.description}</p>
            <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
        </div>
        <div className="rsvp-buttons">
            {!rsvpedEvents.includes(event._id) ? (
            <>
                <button
                className="rsvp-button yes"
                onClick={() => handleRSVP(event._id, "YES")}
                >
                YES
                </button>
                <button
                className="rsvp-button no"
                onClick={() => handleRSVP(event._id, "NO")}
                >
                NO
                </button>
                <button
                className="rsvp-button maybe"
                onClick={() => handleRSVP(event._id, "MAYBE")}
                >
                MAYBE
                </button>
            </>
            ) : (
            <span style={{ color: "greenyellow", fontWeight: "bold" }}>RSVP Submitted</span>
            )}
        </div>
        </div>
    ))}
    </div>
    </div>
    </div>

  );
}

export default UserDashboard;