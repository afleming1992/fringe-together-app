"use client";


import { Button, Container, Text, Stack, Skeleton, Box, AvatarGroup, Avatar, Flex, Spacer } from "@chakra-ui/react";
import { useGroup } from "../context/group";
import { useRouter } from "next/navigation";

const GroupHome = () => {
    const { group } = useGroup();

    return (
        <>
        {
            !group &&
            <Skeleton>
                <Skeleton height="500px" />
            </Skeleton>
        }
        {
            group &&
            <Box bg="gray.900" p="4">
                <Stack direction="column">
                    <Box>
                        <Flex alignItems={"center"}>
                            <Text fontSize="2xl">Interested and Confirmed Shows</Text>
                            <Spacer />
                            <Button colorScheme="green" variant="outline">Add Show</Button>
                        </Flex>
                    </Box>
                </Stack>
            </Box>
            
        }
        </>
    )
}

export default GroupHome;
