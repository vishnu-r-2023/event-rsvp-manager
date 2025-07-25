'use client'
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import '@/app/globals.css';

import {
  Home,
  LogOut,
  LogIn,
  User,
  Calendar
} from 'lucide-react';


const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/adminlogin');
  };

  const isAuthenticated = status === 'authenticated';

  return (
    <div className="desktop-menu">
      <div className="desktop-anav">
        {isAuthenticated ? (
          <>
            <Link href="/admindashboard" className="nav-link">
              <div className="icon-box home"><Home className="icon" /></div>
              <span className="label">Dashboard</span>
            </Link>
            <Link href="/adminprofile" className="nav-link">
              <div className="icon-box user"><User className="icon" /></div>
              <span className="label">Profile</span>
            </Link>
            <Link href="/createevent" className="nav-link">
              <div className="icon-box calendar"><Calendar className="icon" /></div>
              <span className="label">Create Event</span>
            </Link>
            <button onClick={() => signOut()} className="nav-link">
              <div className="icon-box logout"><LogOut className="icon" /></div>
              <span className="label">LogOut</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/adminlogin" className="nav-link">
              <div className="icon-box login"><LogIn className="icon" /></div>
              <span className="label">Admin Login</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;