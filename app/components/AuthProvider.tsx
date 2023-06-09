'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import supabase from '../lib/supabase/browser'
import { AuthChangeEvent, AuthError, Session, User } from '@supabase/supabase-js';

interface AuthProviderProps {
    children: any,
    accessToken: string | null,
}
  
export const VIEWS = {
    LOADING: 'loading',
    SIGN_IN: 'sign_in',
    SIGN_UP: 'sign_up',
    FORGOTTEN_PASSWORD: 'forgotten_password',
    MAGIC_LINK: 'magic_link',
    UPDATE_PASSWORD: 'update_password',
};

export const signOutNoOp = () => {
    return null;
}

export interface AuthContextData {
    initial: any,
    session: Session | null,
    user: User | null,
    view: any,
    setView: any,
    signOut: any
}

export const AuthContext = createContext<AuthContextData>({initial: undefined, session: undefined, user: undefined, view: undefined, setView: () => {}, signOut: () => { return false }});

export const AuthProvider = ({ accessToken, ...props }: AuthProviderProps) => {
    const [ initial, setInitial ] = useState(true);
    const [ session, setSession ] = useState<Session | null>(null);
    const [ view, setView ] = useState<string>(VIEWS.SIGN_IN);
    const [ user, setUser ] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function getActiveSession() {
            const {
                data: { session: activeSession }
            } = await supabase.auth.getSession();
            setSession(activeSession);
            setUser(activeSession?.user ?? null);
            setInitial(false);
        }
        getActiveSession();

        const {
            data: { subscription: authListener },
        } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, currentSession: any) => {
            setSession(currentSession);
            setUser(currentSession?.user ?? null);

            switch(event) {
                case 'PASSWORD_RECOVERY':
                    setView(VIEWS.UPDATE_PASSWORD);
                    break;
                case 'SIGNED_OUT':
                case 'USER_UPDATED':
                    setView(VIEWS.SIGN_IN);
                    break;
                default:
            }
        });

        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    const value = useMemo(() => {
        return {
            initial,
            session,
            user,
            view,
            setView,
            signOut: () => supabase.auth.signOut(),
        };
    }, [initial, session, user, view]);
 
    return <AuthContext.Provider value={value} {...props} />
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};