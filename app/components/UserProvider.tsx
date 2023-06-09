import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useAuth } from "./AuthProvider"
import apolloClient from '@/app/lib/apollo/client';
import { getUser } from "../lib/gql/user";

export interface UserProfile {
    firstName: String | null 
    lastName: String | null
    profilePic: String | null
}

export interface UserContextData {
    profile: UserProfile | null
}

export const UserContext = createContext<UserContextData>({profile: null});

export const UserProvider = ({}) => {
    const { user } = useAuth();
    const [ userProfile, setUserProfile ] = useState<UserProfile | null>(null);
    
    useEffect(() => {
        async function getUserProfile() {
            const { data } = await apolloClient.query({
                query: getUser,
                variables: {
                    uid: user?.id
                }
            })

            setUserProfile({
                firstName: data.first_name,
                lastName: data.last_name,
                profilePic: data.profile_pic
            });
        }
    }, [])

    const value = useMemo(() => {
        return {
            userProfile
        };
    }, [userProfile]);

}

export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined) {
        throw new Error('useUser must be used within an UserProvider');
    }
    return context;
};
