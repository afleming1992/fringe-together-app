"use client";

import NextLink from 'next/link';
import { Group, getGroups } from '@/lib/gql/group';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Groups = () => {
    const [ groups, setGroups ] = useState<Group[] | null>();

    useEffect(() => {
        const getData = async () => {
            const groups = await getGroups();
            setGroups(groups);
        }
        getData();
    }, [])

    return (
        <>
            {
                groups &&
                <Box mt="4">
                    {
                        groups.map((group : Group) => (
                            <Card 
                                key={group.id}
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='outline'>
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