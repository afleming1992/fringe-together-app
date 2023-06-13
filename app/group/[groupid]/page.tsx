"use client";

import AuthWrapper from "@/app/components/Auth/AuthWrapper";
import { Group, getGroupById } from "@/lib/gql/group";
import { Container, Text, Stack, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface GroupHomeProps {
    params: GroupHomeParams
}

interface GroupHomeParams {
    groupid: string
}

const GroupHome = ({ params } : GroupHomeProps) => {
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data: Group = await getGroupById(parseInt(params.groupid));
            setGroup(data);
        };
        getData();
        
    }, [params])

    return (
        <AuthWrapper required={true}>
            <Container maxWidth={"3xl"}>
            {
                !group &&
                <Stack>
                    <Skeleton height="100px" />
                    <Skeleton height="50px" />
                    <Skeleton height="1000px" />
                </Stack>
            }
            {
                group &&
                <>
                    <Text fontWeight="700" fontSize="3xl">{group.name}</Text>
                    <p>{ group.members.length }</p>
                </>
            }
            </Container>
        </AuthWrapper>
    )
}

export default GroupHome;
