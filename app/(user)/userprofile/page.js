'use client';
import React from 'react';
import { useSession } from "next-auth/react";
import Image from "next/image";

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in.</p>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2>Welcome, {session.user.name}!</h2>
        {session.user.image && (
          <Image src={session.user.image} alt="Profile" width={80} height={80} className="user-image" />
        )}
        <p>Email: {session.user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
