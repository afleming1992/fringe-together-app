"use client";

import { AvatarGroup, Box, Button, ButtonGroup, Flex, Grid, GridItem, Heading, SimpleGrid, Skeleton, Spacer, Stack, Text, Tabs, TabList, Tab, TabPanels } from "@chakra-ui/react";
import { useGroup } from "../../context/group";
import UserAvatar from "@/app/components/UserAvatar";
import { useRouter } from "next/navigation";
import { AddShowProvider } from "./AddShowProvider";

interface GroupPageWrapperProps {
    children: any
}

const GroupPageWrapper = ({children}: GroupPageWrapperProps) => {
    const { group } = useGroup();
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
            <AddShowProvider group={group}>
                <Box bg="gray.900" mb="1">
                    <Grid mb={2} templateColumns={{
                        base: 'repeat(1, 1fr)',
                        sm: 'repeat(3, 1fr)',
                        md: 'repeat(5, 1fr)',
                        }}
                        gap={6}>
                        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
                            <Heading p={4} as={'h2'}>{ group.name }</Heading>
                        </GridItem>
                    </Grid>
                    {children}
                </Box>
            </AddShowProvider>
            </>
        }
        </>
    );

}

export default GroupPageWrapper;