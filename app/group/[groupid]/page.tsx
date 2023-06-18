"use client";

import UserAvatar from "@/app/components/UserAvatar";
import { Button, Container, Text, Stack, Skeleton, Box, AvatarGroup, Avatar, Flex, Spacer } from "@chakra-ui/react";
import { useGroup } from "../context/group";

const GroupHome = () => {
    const { group } = useGroup();

    return (
        <>
        {
            !group &&
            <Stack>
                <Skeleton height="50px" />
                <Skeleton height="1000px" />
            </Stack>
        }
        {
            group &&
            <Stack direction="column">
                <Box>
                    <Flex alignItems={"center"}>
                        <Text fontSize="2xl">Interested and Confirmed Shows</Text>
                        <Spacer />
                        <Button colorScheme="green" variant="outline">Add Show</Button>
                    </Flex>
                </Box>
            </Stack>
        }
        </>
    )
}

export default GroupHome;
