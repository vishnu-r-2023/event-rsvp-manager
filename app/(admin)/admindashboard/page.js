'use client';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';

const AdminDashboard = () => {
  const { data: session } = useSession();
  const [adminId, setAdminId] = useState(null);
  const [events, setEvents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch adminId from session email
  useEffect(() => {
    if (!session?.user?.email) return;
    fetch('/api/users')
      .then((res) => res.json())
      .then((users) => {
        const admin = users.find(u => u.email === session.user.email);
        if (admin) setAdminId(admin._id);
      });
  }, [session]);

  // Fetch events for admin
  useEffect(() => {
    if (!adminId) return;
    fetch(`/api/events?adminId=${adminId}`)
      .then((res) => res.json())
      .then((json) => setEvents(json))
      .catch((err) => console.error('Error:', err));
  }, [adminId]);

  const handleDelete = async (id) => {
    setLoading(true);
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
    setEvents(events.filter((e) => e._id !== id));
    setLoading(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedEvent(events[index]);
  };

  const handleSave = async () => {
    setLoading(true);
    const updated = [...events];
    const eventId = updated[editIndex]._id;
    const res = await fetch(`/api/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedEvent),
    });
    const updatedEvent = await res.json();
    updated[editIndex] = updatedEvent;
    setEvents(updated);
    setEditIndex(null);
    setLoading(false);
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Events Dashboard</h2>
      {loading && <div>Loading...</div>}
      <table className="main-container">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Guests & RSVP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={event._id}>
              <td>
                {editIndex === index ? (
                  <input value={editedEvent.title} onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })} />
                ) : (
                  event.title
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input value={editedEvent.description} onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })} />
                ) : (
                  event.description
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type="date" value={editedEvent.date?.slice(0,10)} onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })} />
                ) : (
                  new Date(event.date).toLocaleDateString()
                )}
              </td>
              <td>
                <ul>
                  {event.guests?.map((g, i) => (
                    <li key={g.email}>{g.email}: {g.rsvp}</li>
                  ))}
                </ul>
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleSave}>SAVE</button>
                    <button onClick={() => setEditIndex(null)}>CANCEL</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>EDIT</button>
                    <button onClick={() => handleDelete(event._id)}>DELETE</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
