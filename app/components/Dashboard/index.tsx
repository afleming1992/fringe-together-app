"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../AuthProvider";
import Groups from "./Groups";

const Dashboard = () => {
    const { profile } = useAuth();

    return (
        <div className="container mx-auto">
            <>
                {
                    profile &&
                    <Text fontWeight={"700"} fontSize={"3xl"}>Welcome back <span color="pink.400">{ profile.first_name }</span></Text>
                }
                {/* <div className="mt-2 w-full p-3">
                    <Box>
                        <h3 className="font-bold text-2xl">My Next Shows</h3>
                        
                    </Box>
                </div> */}
                <Stack>
                    <Box>
                        <Text fontSize={"xl"}>My Groups</Text>
                        <Groups />
                    </Box>
                </Stack>
            </>
        </div>
    );
}

export default Dashboard;
