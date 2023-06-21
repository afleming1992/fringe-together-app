"use client";

import { Box, Spinner, Container, Text } from "@chakra-ui/react";

const Loading = () => {
    return (
        <Container maxWidth="3xl" textAlign="center" mt="4" >
            <Box>
                <Text size="2xl">Loading...</Text>
                <Spinner mt="4" color="pink" size='xl' />
            </Box>
        </Container>
        
    );
}

export default Loading;