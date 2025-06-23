
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { isAdmin } from '@/lib/admin';
import { Loader } from '@/components/common/Loader';
import { Header } from '@/components/common/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        // Not logged in, redirect to sign-in page
        router.replace('/signin');
      } else {
        // Asynchronously check if the user is an admin
        isAdmin(user.uid).then(isUserAdmin => {
          if (!isUserAdmin) {
            // Logged in but not an admin, redirect to client dashboard
            router.replace('/dashboard');
          } else {
            // User is an authenticated admin
            setIsAuthorized(true);
          }
        });
      }
    }
  }, [user, authLoading, router]);

  // While checking auth or if user is not authorized, show a loader
  if (!isAuthorized) {
    return <Loader />;
  }

  // If authorized, render the admin layout and its children
  return (
    <div className="flex min-h-screen flex-col bg-background">
        <Header />
        {children}
    </div>
  );
}
