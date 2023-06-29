"use client";


import { Button, Container, Text, Stack, Skeleton, Box, AvatarGroup, Avatar, Flex, Spacer } from "@chakra-ui/react";
import { useGroup } from "../context/group";
import { useRouter } from "next/navigation";
import { useAddShow } from "./components/AddShowProvider";

const GroupHome = () => {
    const { group } = useGroup();
    const { openModal } = useAddShow();

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
            <Stack direction="column">
                <Box>
                    <Flex alignItems={"center"}>
                        <Text fontSize="2xl">Interested and Confirmed Shows</Text>
                        <Spacer />
                        <Button onClick={() => { openModal() }} colorScheme="green" variant="outline">Add Show</Button>
                    </Flex>
                </Box>
            </Stack>
        }
        </>
    )
}

export default GroupHome;
