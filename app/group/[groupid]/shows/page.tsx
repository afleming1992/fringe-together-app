"use client";

import { Box, Skeleton, Stack, Flex, Spacer, Button } from "@chakra-ui/react";
import { useGroup } from "../../context/group";

const Shows = () => {
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
                            
                        </Flex>
                    </Box>
                </Stack>
            </Box>
        }
        </>
    )
}

export default Shows;