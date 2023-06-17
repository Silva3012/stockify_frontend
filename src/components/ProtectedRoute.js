import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken } from 'next-auth/jwt';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Function to check if the user is authenticated
    const checkAuthentication = async () => {
      // Retrieve the JWT token from the client-side storage (e.g., localStorage)
      const token = localStorage.getItem('token');

      // If the token is not present or invalid, redirect to the login page
      if (!token) {
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [router]);

  // Render the protected route or a loading indicator
  return <>{children}</>;
}
