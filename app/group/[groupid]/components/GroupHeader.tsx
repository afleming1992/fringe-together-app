"use client";

import { AvatarGroup, Box, Button, ButtonGroup, Flex, Grid, GridItem, Heading, SimpleGrid, Skeleton, Spacer, Stack, Text, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useGroup } from "../../context/group";
import UserAvatar from "@/app/components/UserAvatar";
import { useRouter } from "next/navigation";

const GroupHeader = () => {
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
            <Box bg="gray.900" p="4" mb="1">
                <Grid templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(5, 1fr)',
                    }}
                    gap={6}>
                    <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
                        <Heading as={'h2'}>{ group.name }</Heading>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex flexDirection={'column'}>
                            <AvatarGroup>
                                {
                                    group.members.filter((member) => {
                                        return member.admin
                                    }).map((member) => (

                                        <UserAvatar showName={true} size={"md"} key={member.user.uid} user={member.user} />
                                    ))
                                }
                            </AvatarGroup>
                            <Box fontSize={'sm'}>
                                Group Admins
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex flexDirection={'column'}>
                            <Text fontSize={'4xl'} fontWeight={'bold'}>
                                TBA
                            </Text>
                            <Box fontSize={'sm'}>
                                Interested Shows
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem w="100%">
                        <Flex flexDirection={'column'}>
                            <Text fontSize={'4xl'} fontWeight={'bold'}>
                                { group.members.length }
                            </Text>
                            <Box fontSize={'sm'}>
                                Group Members
                            </Box>
                        </Flex>
                    </GridItem>
                </Grid>
            </Box>
            <Box bg="gray.900" p="4">
                <Tabs isFitted colorScheme="pink" align="center">
                    <TabList>
                        <Tab onClick={() => { router.push(`/group/${group.id}`) }}>Home</Tab>
                        <Tab onClick={() => { router.push(`/group/${group.id}/shows`) }}>Shows</Tab>
                        <Tab onClick={() => { router.push(`/group/${group.id}/members`) }}>Members</Tab>
                    </TabList>
                </Tabs>
            </Box>
            </>
        }
        </>
    );

}

export default GroupHeader;