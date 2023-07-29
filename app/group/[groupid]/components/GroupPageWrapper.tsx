"use client";

import { AvatarGroup, Box, Button, ButtonGroup, Flex, Grid, GridItem, Heading, SimpleGrid, Skeleton, Spacer, Stack, Text, Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import { useGroup } from "../../context/group";
import UserAvatar from "@/app/components/UserAvatar";
import { useRouter } from "next/navigation";
import { ShowProvider } from "./ShowProvider";
import { GroupLock } from "./GroupLock";

interface GroupPageWrapperProps {
    children: any
}

const GroupPageWrapper = ({children}: GroupPageWrapperProps) => {
    const { group, isGroupAdmin } = useGroup();
    const router = useRouter();

    return (
        <>
        {
            !group &&
            <Skeleton mb={1}>
                <Skeleton height="100px" />
            </Skeleton>
        }
        {
            group && 
            <>
            <ShowProvider group={group}>
                <Box bg="gray.900" mb="1">
                    <Flex p={2} direction={{ base: 'column', md: 'row' }}>
                        <Box flex={3}>       
                            <Heading p={4} as={'h2'}>{ group.name }</Heading>
                        </Box>
                    </Flex>
                    {children}
                </Box>
            </ShowProvider>
            </>
        }
        </>
    );

}

export default GroupPageWrapper;