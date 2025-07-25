'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const UserHome=()=>{
  return (
    <div>
    <h1 className="dashboard-title" style={{textAlign:"center",marginTop:"120px"}}>Welcome You to User Home Page !!</h1>
    <h2 className='dashboard-title'>Navigate to other routes to Explore the Features...</h2>
    </div>

  );
}

export default UserHome;