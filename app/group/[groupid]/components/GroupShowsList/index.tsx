import { GroupMembership } from "@/lib/gql/group";
import { GroupShow, Show } from "@/lib/gql/types";
import { User } from "@/lib/gql/user";
import GroupShowItem from './GroupShowItem';
import { Box } from "@chakra-ui/react";
import { GroupShowInterestType } from "@prisma/client";
import { GroupShowModalProvider } from "./GroupInterestModalProvider";

interface GroupShowsListProps {
    shows: GroupShow[]
    members: GroupMembership[]
}

const GroupShowsList = ({shows, members}: GroupShowsListProps) => {
    return (
        <Box mt={2}>
            <GroupShowModalProvider>
                {
                    shows.map((show) => {
                        return (
                            <GroupShowItem key={show.show.uri} show={show} members={members} />
                        );
                    })
                }
            </GroupShowModalProvider>
        </Box>
    );
}

export default GroupShowsList;