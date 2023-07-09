import { Group } from "@/lib/gql/group";
import { GroupShow } from "@/lib/gql/types";
import { User } from "@/lib/gql/user";
import GroupShowItem from './GroupShowItem';
import { Box } from "@chakra-ui/react";
import { GroupMembership } from "@prisma/client";

interface GroupShowsListProps {
    shows: GroupShow[]
    members: GroupMembership[]
    currentUser: User
}

const GroupShowsList = ({shows, members, currentUser}: GroupShowsListProps) => {
    return (
        <Box mt={2}>
            {
                shows.map((show) => {
                    return (
                        <GroupShowItem key={show.show.uri} show={show} members={members} />
                    );
                })
            }
        </Box>
    );
}

export default GroupShowsList;