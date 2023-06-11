'use client';

import Auth from './components/Auth';
import Intro from './components/Intro'

import { useAuth, VIEWS } from './components/AuthProvider';
import Card from './components/Card';
import AuthRequiredWrapper from './components/Auth/AuthWrapper';
import AuthWrapper from './components/Auth/AuthWrapper';
import Dashboard from './components/Dashboard';

export default function Home() {
  const { user } = useAuth();

  return (
    <AuthWrapper required={false}>
      {
          user &&
          <Dashboard />
      }
      {
          !user &&
          <Intro />
      
      }
    </AuthWrapper>
  );
}
