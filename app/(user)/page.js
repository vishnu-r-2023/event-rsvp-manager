'use client';
import { useSession } from 'next-auth/react';
import '@/app/globals.css'

const UserHome = () => {
  const { data: session } = useSession();

  return (
    <div className="user-home-container">
      <div className="user-home-card">
        <h1 className="user-home-title">
          Welcome {session?.user?.name || 'User'}!
        </h1>
        <p className="user-home-subtext">
          You're on the User Home Page. Enjoy a seamless experience managing your events and RSVPs.
        </p>
        <div className="user-home-description">
          Use the navigation bar to explore features like:
          <ul className="user-home-list">
            <li>Your Events</li>
            <li>RSVP Status</li>
            <li>Upcoming Invitations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
