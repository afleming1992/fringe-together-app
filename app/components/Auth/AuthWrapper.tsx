"use client";

import { useAuth } from "../AuthProvider";
import Auth from ".";
import Card from "../Card";
import { Box } from "@chakra-ui/react";
import Loading from "../Loading";

interface AuthRequiredWrapper {
    required: boolean,
    children: any
}

const AuthWrapper = ({children, required}: AuthRequiredWrapper) => {
    const { initial, user, view, signOut } = useAuth();

    if (initial && required) {
        return <div className="mx-auto max-w-md">
            <Loading />
        </div>
    }

    if (!user && required || view != null) {
        return <Auth />
    } else {
        return <>
            {children}
        </>
    }
}

export default AuthWrapper;