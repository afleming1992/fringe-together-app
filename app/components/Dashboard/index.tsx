"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../AuthProvider";
import Groups from "./Groups";

const Dashboard = () => {
    const { profile } = useAuth();

    return (
        <>
            <Stack mt={4}>
                <Box>
                    <Groups />
                </Box>
            </Stack>
        </>
    );
}

export default Dashboard;
