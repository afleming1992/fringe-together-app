"use client";


import { Button, Flex, Spacer, Container, Text, Stack, Skeleton, Box, Tab, TabList, TabPanels, Tabs, TabPanel } from "@chakra-ui/react";
import { useGroup } from "../context/group";
import { useRouter } from "next/navigation";
import { useAddShow } from "./components/AddShowProvider";
import GroupShows from "./components/GroupShows";

const GroupHome = () => {
    const { group } = useGroup();
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
                <Tabs isFitted variant="solid-rounded" colorScheme="pink">
                    <TabList>
                        <Tab>Interested Shows</Tab>
                        <Tab>Members</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <GroupShows />
                            <Flex alignItems={"center"}>
                                <Text fontSize="2xl">Interested and Confirmed Shows</Text>
                                <Spacer />
                                <Button onClick={() => { openModal() }} colorScheme="green">Add Show</Button>
                            </Flex>
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
