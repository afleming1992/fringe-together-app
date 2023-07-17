import { useGroup } from "@/app/group/context/group";
import { Group, updateGroup } from "@/lib/gql/group";
import { Badge, Box, Card, Center, Flex, Heading, Spinner, Switch, Text } from "@chakra-ui/react";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";

export const GroupLock = () => {
    const { group } = useGroup();
    const [joinable, setJoinable] = useState<boolean>(false);
    const [joinCode, setJoinCode] = useState<string | null>(null);

    useEffect(() => {
        if(group) {
            setJoinCode(group.joinCode);
            setJoinable(group.joinable);
        }
    },[group])

    const updateJoinPreferences = async (joinable: boolean) => {
        if(group) {
            const updatedGroup = await updateGroup(group.id, undefined, joinable);
            setJoinCode(updatedGroup.joinCode);
        }
    }

    const handleChange = (e: any) => {
        setJoinable(e.target.checked);
        updateJoinPreferences(e.target.checked);
    }

    return (
        <Center>
            <Flex 
                bg={"gray.700"}
                direction={"column"}
                minWidth={"xs"}
                maxWidth={"sm"}
                rounded={"lg"}
                p={4}>
                <Heading size="sm" mb={4}>Privacy</Heading>
                <Flex>
                    <Switch flex={1} size="lg" isChecked={joinable} onChange={handleChange} mr={4} />
                    <Text flex={2}>
                        {
                            !joinable &&
                            <Badge colorScheme="red" fontSize={"1em"}>
                                <FontAwesomeIcon icon={faLock} /> Private
                            </Badge>
                        }
                        {
                            joinable && joinCode == null &&
                            <Badge colorScheme="blue" fontSize={"1em"}>
                                <Spinner size="xs" /> Generating Code...
                            </Badge>
                        }
                        {
                            joinable && joinCode &&
                            <Badge colorScheme="green" fontSize={"1em"}>
                                <FontAwesomeIcon icon={faUnlock} /> Join Code: { joinCode }
                            </Badge>
                        }
                    </Text>
                </Flex>
            </Flex>
            
        </Center>
    )
}