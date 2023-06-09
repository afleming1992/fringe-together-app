'use client';

import Auth from './components/Auth';
import Intro from './components/Intro'

import { useAuth, VIEWS } from './components/AuthProvider';
import Card from './components/Card';

export default function Home() {
  const { initial, user, view, signOut } = useAuth();

  if (initial) {
    return <div className="mx-auto max-w-md">
        <Card>Loading...</Card>
      </div>
  }

  if(view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    console.log(user);

    return  (
      <div className="card">
        <h2>Welcome back!</h2>
        <code className="highlight">{user.role}</code>
      </div>
    )
  }

  return <Auth view={view} />
}
