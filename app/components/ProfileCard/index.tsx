import { Text, Badge, Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserAvatar from "../UserAvatar";
import { User } from "@/lib/gql/user";
import { ReactNode } from "react";

interface ProfileCardProps {
    user: User,
    bgColor: string,
    children: ReactNode
}

export const ProfileCard = ({user, bgColor, children, ...props} : ProfileCardProps) => {
    return (
        <Box bg={bgColor} height='80px' padding={4} rounded="lg">
            <Flex>
                <UserAvatar size={"md"} user={user} />
                <Box ml="3">
                    <Text fontWeight='bold' fontSize='1em'>
                        { user.firstName} { user.lastName }
                    </Text>
                    {
                        children
                    }
                </Box>
            </Flex>
        </Box>
    )
}