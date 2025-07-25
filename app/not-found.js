'use client'
import Image from 'next/image';
import Link from 'next/link';
import BackgroundBlobs from './components/BackgroundBlobs';
import './globals.css'
export default function NotFound() {
  return (
    <>
    <BackgroundBlobs />
    <div style={{ textAlign: 'center', padding: '60px' }}>
      <Image
        src="/page-404.png"
        alt="Page Not Found"
        width={300}
        height={300}
      />
      <h1 className='dashboard-title'>404 - Page Not Found</h1>
      <p className='dashboard-title'>The page you're looking for doesn't exist.</p>
    </div>
    </>
  );
}
