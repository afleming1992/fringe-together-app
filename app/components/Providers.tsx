"use client";

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, ColorModeScript, Container, Flex, ThemeConfig, cookieStorageManagerSSR, localStorageManager, } from '@chakra-ui/react'
import { ReactNode } from "react"
import { AuthProvider } from './AuthProvider';
import { extendTheme } from '@chakra-ui/react';
import { color } from 'framer-motion';
import { FlashlessScript, flashless } from 'chakra-ui-flashless';

interface ProvidersProps {
    children: ReactNode,
    accessToken: string | null,
    cookies: any | null, 
}

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

//https://coolors.co/29335c-db2777-f3a712-a8c686-669bbc
const colors = {
    brand: {
        pink: '#DB2777',
        dark: '#29335C',
        orange: '#F3A712',
        olive: '#A8C686',
        blue: '#669BBC'
    }
}


export const theme = extendTheme({ config, colors }, flashless())

const Providers = ({children, accessToken, cookies}: ProvidersProps) => {
    return (
        <>
            <FlashlessScript theme={theme} />
            <CacheProvider>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <ChakraProvider theme={theme}>
                    <AuthProvider accessToken={accessToken}>
                        {children}
                    </AuthProvider>
                </ChakraProvider>
            </CacheProvider>
        </>
        
    );
}

export default Providers;