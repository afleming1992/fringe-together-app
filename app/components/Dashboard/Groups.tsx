"use client";

import { Group, getGroups } from '@/lib/gql/group';
import { Box, Card, CardHeader, Skeleton } from '@chakra-ui/react';
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
                            <Card key={group.id}>
                                <CardHeader>
                                    { group.name }
                                </CardHeader>
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