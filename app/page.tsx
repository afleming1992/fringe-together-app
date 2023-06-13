'use client';

import Auth from './components/Auth';
import Intro from './components/Intro'

import { useAuth, VIEWS } from './components/AuthProvider';
import AuthRequiredWrapper from './components/Auth/AuthWrapper';
import AuthWrapper from './components/Auth/AuthWrapper';
import Dashboard from './components/Dashboard';
import { Container } from '@chakra-ui/react';

export default function Home() {
  const { user } = useAuth();

  return (
    <Container maxWidth={"5xl"}>
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
    </Container>
  );
}
