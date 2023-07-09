import UserAvatar from "@/app/components/UserAvatar";
import { useGroup } from "@/app/group/context/group";
import { GroupMembership } from "@/lib/gql/group"
import { SimpleGrid, Box, Heading, Text, Badge, Avatar, Flex, ButtonGroup, Button } from "@chakra-ui/react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GroupMembersListProps {
    members: GroupMembership[]
}

export const GroupMembersList = ({members}: GroupMembersListProps) => {
    const { isGroupAdmin } = useGroup();

    const admins = members.filter((member) => {
        return member.admin
    });

    const nonAdmins = members.filter((member) => {
        return !member.admin
    })
    
    return (
        <SimpleGrid columns={[1, null , 2]} spacing={5}>
            {
                admins.map((admin) => (<GroupMemberListItem key={admin.user.uid} member={admin} addAdminActions={isGroupAdmin} />))
            }
            {
                nonAdmins.map((member) => (<GroupMemberListItem key={member.user.uid} member={member} addAdminActions={isGroupAdmin} />))
            }
        </SimpleGrid>
    );
}

interface GroupMemberListItem {
    member: GroupMembership;
    addAdminActions?: boolean;
}

const GroupMemberListItem = ({member, addAdminActions = false, ...props} : GroupMemberListItem) => {
    return (
        <Box bg='gray.700' height='80px' padding={4} rounded="lg">
            <Flex>
                <UserAvatar size={"md"} user={member.user} />
                <Box ml="3">
                    <Text fontWeight='bold'>
                        { member.user.firstName} { member.user.lastName }
                        {
                            member.admin &&
                            <Badge ml='1' colorScheme='yellow'>
                                <FontAwesomeIcon icon={faStar} /> Admin
                            </Badge>
                        }
                    </Text>
                    {
                        addAdminActions &&
                        <ButtonGroup size="xs">
                            <Button>Remove User</Button>
                        </ButtonGroup>
                    }
                </Box>
            </Flex>
        </Box>
    )
}