import { GroupMembership } from "@/lib/gql/group";
import { GroupShow } from "@/lib/gql/types";
import { User } from "@/lib/gql/user";
import GroupShowItem from './GroupShowItem';
import { Box } from "@chakra-ui/react";

interface GroupShowsListProps {
    shows: GroupShow[]
    members: GroupMembership[]
}

const GroupShowsList = ({shows, members}: GroupShowsListProps) => {
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