"use client";


import { Button, Flex, Stack, Skeleton, Tab, TabList, TabPanels, Tabs, TabPanel } from "@chakra-ui/react";
import { useGroup } from "../context/group";
import { useAddShow } from "./components/AddShowProvider";
import GroupShowsList from "./components/GroupShowsList";
import { GroupMembersList } from "./components/GroupMembersList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const GroupHome = () => {
    const { group, refresh } = useGroup();
    const { openModal } = useAddShow();

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
            <Stack direction="column">
                <Tabs isFitted variant="solid-rounded" colorScheme="pink" p={2} >
                    <TabList>
                        <Tab>Shows ({group.shows.length})</Tab>
                        <Tab>Members ({group.members.length})</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Flex alignItems={"center"}>
                                <Button my={2} width="full" variant="ghost" onClick={() => { openModal() }} colorScheme="green"><FontAwesomeIcon icon={faPlusCircle} />&nbsp;Add Show</Button>
                            </Flex>
                            <GroupShowsList shows={group.shows} members={group.members} />
                        </TabPanel>
                        <TabPanel>
                            <GroupMembersList members={group.members} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>
        }
        </>
    )
}

export default GroupHome;
