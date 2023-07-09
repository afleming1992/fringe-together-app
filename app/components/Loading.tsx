"use client";

import { Box, Spinner, Container, Text } from "@chakra-ui/react";

interface LoadingProps {
    message?: string
}

const Loading = ({message = "Loading..."}: LoadingProps) => {
    return (
        <Container maxWidth="3xl" textAlign="center" mt="4" >
            <Box>
                <Text size="2xl">{message}</Text>
                <Spinner mt="4" color="pink" size='xl' />
            </Box>
        </Container>
        
    );
}

export const SimpleLoading = ({message}: LoadingProps) => {
    return (
        <Box>
            <Text size="2xl">{message}</Text>
            <Spinner mt="4" color="pink" size='xl' />
        </Box>
    )
}

export default Loading;