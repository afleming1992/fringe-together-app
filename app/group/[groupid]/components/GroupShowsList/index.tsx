import { GroupMembership } from "@/lib/gql/group";
import { GroupShow, Show } from "@/lib/gql/types";
import { User } from "@/lib/gql/user";
import GroupShowItem from './GroupShowItem';
import { Box } from "@chakra-ui/react";
import { GroupShowInterestType } from "@prisma/client";

interface GroupShowsListProps {
    shows: GroupShow[]
    members: GroupMembership[]
}

const GroupShowsList = ({shows, members}: GroupShowsListProps) => {

    const onInterestClick = (type: GroupShowInterestType, show: Show) => {
        
    }


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