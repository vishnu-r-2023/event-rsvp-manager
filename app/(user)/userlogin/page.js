'use client';

import React, { useEffect } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/userprofile');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="wrapper">
      <div className="card">
        <h2>Please Sign IN</h2>
        <button className="login-button" onClick={() => signIn("github-user", {callbackUrl: "/userprofile"})}>Sign in with GitHub !!</button>
      </div>
    </div>
  );
};

export default Login;
