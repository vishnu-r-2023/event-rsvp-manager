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
  User
} from 'lucide-react';


const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/userlogin');
  };

  const isAuthenticated = status === 'authenticated';

  return (
    <div className="desktop-menu">
      <div className="desktop-nav">
        {isAuthenticated ? (
          <>
            <Link href="/userdashboard" className="nav-link">
              <div className="icon-box home"><Home className="icon" /></div>
              <span className="label">Home</span>
            </Link>
            <Link href="/userprofile" className="nav-link">
              <div className="icon-box signup"><User className="icon" /></div>
              <span className="label">Profile</span>
            </Link>
            <button onClick={() => signOut()} className="nav-link">
              <div className="icon-box logout"><LogOut className="icon" /></div>
              <span className="label">LogOut</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/userlogin" className="nav-link">
              <div className="icon-box login"><LogIn className="icon" /></div>
              <span className="label">User Login</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;