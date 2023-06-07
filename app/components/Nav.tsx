'use client';

import { Session } from '@supabase/auth-helpers-nextjs';
import supabase from '../lib/supabase/server';
import SignOut from './SignOut';
import { VIEWS, useAuth } from './AuthProvider';

interface NavbarProps {
    session: Session | null
}

const NavBar = () => {
    const { initial, session, setView } = useAuth();

    return  (
        <nav className="mx-auto p-6 flex items-center justify-between">
            <div className='flex items-center justify-between'>
                <div>
                    <a href={"/"} className="font-bold text-2xl">FringeTogether</a>
                </div>
            </div>

            <div className="flex lg:hidden">

            </div>
            
            <div>
                {
                    !initial && session &&
                    <div className="flex">
                        <SignOut />
                    </div>
                }
                {
                    !initial && !session &&
                    <div className="flex">
                        <button onClick={() => setView(VIEWS.SIGN_IN)} className="bg-pink-400 text-white p-2 rounded mr-3">Login</button>
                        <button onClick={() => setView(VIEWS.SIGN_UP)} className="bg-white text-black p-2 rounded">Signup</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default NavBar;