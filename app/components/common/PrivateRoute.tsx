import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import { RootState, useAppSelector } from '@/app/redux/store';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const token = auth.token;
  const isAdmin = auth.isAdmin;
  const navigate = useRouter();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token && !isAdmin) {
      navigate.push('/auth/login');
    }

    setLoading(false);

  }, [token, navigate, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 flex justify-center pt-36">
        <Spinner fill="fill-white" wAndH='w-10 h-10' />
      </div>
    );
  }

  return token ? children : null;
};

export default PrivateRoute;
