'use client';

import Auth from './components/Auth';
import Intro from './components/Intro'

import { useAuth, VIEWS } from './components/AuthProvider';

export default function Home() {
  const { user, view, signOut } = useAuth();

  if(view === VIEWS.UPDATE_PASSWORD) {
    return <Auth view={view} />;
  }

  if (user) {
    console.log(user);

    return  (
      <div className="card">
        <h2>Welcome!</h2>
        <code className="highlight">{user.role}</code>
      </div>
    )
  }

  return <Auth view={view} />
}
