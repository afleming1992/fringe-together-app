'use client';

import Auth from './components/Auth';
import Intro from './components/Intro'

import { useAuth, VIEWS } from './components/AuthProvider';
import Card from './components/Card';
import AuthRequiredWrapper from './components/Auth/AuthWrapper';

export default function Home() {
  const { user } = useAuth();

  return  (
    <>
      {
          user &&
          <>Welcome back</>
      }
      {
          !user &&
          <Intro />
      }
    </>
  );
}
