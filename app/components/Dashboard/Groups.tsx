"use client";

import NextLink from 'next/link';
import { Group, getGroups } from '@/lib/gql/group';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { JoinGroupForm } from './JoinGroupForm';

const Groups = () => {
    const [ groups, setGroups ] = useState<Group[] | null>();
    const [ refresh, setRefresh ] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            const groups = await getGroups();
            setGroups(groups);
        }
        if(refresh) {
            getData();
            setRefresh(false);
        }
    }, [refresh])

    return (
        <>
            <Box mb={2}>
                <JoinGroupForm onJoinedGroup={() => { setRefresh(false) }} />
            </Box>
            {
                groups &&
                <Box mt="4">
                    {
                        groups.map((group : Group) => (
                            <Card 
                                key={group.id}
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='filled'
                                mb={2}>
                                <Stack>
                                    <CardBody>
                                        <Heading size='md'>{ group.name }</Heading>
                                    </CardBody>
                                    <CardFooter>
                                        <Button as={NextLink} href={`/group/${group.id}`} variant='outline' colorScheme="pink">
                                            View Group
                                        </Button>
                                    </CardFooter>
                                </Stack>  
                            </Card>
                        ))
                    }        
                </Box>
            }
            {
                !groups &&
                <Skeleton mt="4">
                    <p>This Content will never be shown</p>
                </Skeleton>
            }
        </>
    )
}

export default Groups;