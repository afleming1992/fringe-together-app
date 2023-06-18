"use client";

import { AvatarGroup, Box, Button, ButtonGroup, Flex, Grid, GridItem, Heading, SimpleGrid, Skeleton, Spacer, Stack, Text } from "@chakra-ui/react";
import { useGroup } from "../../context/group";
import UserAvatar from "@/app/components/UserAvatar";

const GroupHeader = () => {
    const { group } = useGroup();

    return (
        <>
        {
            !group &&
            <Skeleton>
                <Skeleton height="100px" />
            </Skeleton>
        }
        {
            group && 
            <Box bg="gray.900" p="4">
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
        }
        </>
    );

}

export default GroupHeader;