import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (status !== 'loading' && !session) {
      router.push('/auth/login');
    }

    // Set loading to false once the authentication status is determined
    setLoading(false);
  }, [status, session, router]);

  // Show a loading state while checking authentication
  if (loading || status === 'loading') {
    return <Spinner />;
  }

  // Render the protected content if user is logged in
  return session ? children : null;
};
export default PrivateRoute