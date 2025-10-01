'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <div className="min-h-screen">{children}</div>
      {!isDashboard && <Footer />}
    </>
  );
}