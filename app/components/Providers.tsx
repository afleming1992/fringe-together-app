"use client";

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from "react"
import { AuthProvider } from './AuthProvider';

interface ProvidersProps {
    children: ReactNode,
    accessToken: string | null
}

const Providers = ({children, accessToken}: ProvidersProps) => {
    return (
        <CacheProvider>
            <ChakraProvider>
                <AuthProvider accessToken={accessToken}>
                    {children}
                </AuthProvider>
            </ChakraProvider>
        </CacheProvider>
    );
}

export default Providers;