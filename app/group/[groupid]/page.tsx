"use client";


import { Button, Flex, Stack, Skeleton, Tab, TabList, TabPanels, Tabs, TabPanel } from "@chakra-ui/react";
import { useGroup } from "../context/group";
import { useAddShow } from "./components/AddShowProvider";
import GroupShowsList from "./components/GroupShowsList";

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
                <Tabs isFitted variant="solid-rounded" colorScheme="pink" >
                    <TabList>
                        <Tab>Shows ({group.shows.length})</Tab>
                        <Tab>Members ({group.members.length})</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Flex alignItems={"center"}>
                                <Button width="full" variant="outline" onClick={() => { openModal() }} colorScheme="green">Add Show</Button>
                            </Flex>
                            <GroupShowsList shows={group.shows} members={group.members} />
                        </TabPanel>
                        <TabPanel>
                            <p>Members</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Stack>
        }
        </>
    )
}

export default GroupHome;
