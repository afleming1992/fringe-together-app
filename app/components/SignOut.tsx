'use client';

import { useAuth } from './AuthProvider';

const SignOut = () => {
    const { signOut } = useAuth();

    async function handleSignOut() {
        const { error } = await signOut();

        if (error) {
            console.error('Error signing out:', error);
        }
    }

    return (
        <button onClick={handleSignOut} type="button" className="bg-red-400 hover:bg-red-500 text-white p-2 rounded mr-3">Sign Out</button>
    )
}

export default SignOut;