import { GroupShow, GroupShowInterest, GroupShowInterestType } from "@/lib/gql/types"
import { Avatar, AvatarBadge, AvatarGroup, Badge, Box, Button, ButtonGroup, Flex, Stack, useId } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import { User } from "@/lib/gql/user";
import { GroupMembership } from "@/lib/gql/group";
import { faCheck, faHeart, faTicketSimple, faCheckCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartUnfilled, faCheckCircle as faCheckCircleUnfilled } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";

export enum GroupInterestVariant {
    OVERVIEW="overview"
}

interface GroupInterestProps {
    variant?: GroupInterestVariant,
    members: GroupMembership[],
    interest: GroupShowInterest[],
    currentInterestType: GroupShowInterestType,
    onInterestedClick: () => void,
    onGoingClick: () => void
}

const getInterested = (interest: GroupShowInterest[], includeInterestedInDate: boolean = false) => {
    const interested = interest.filter((item) => {
        if(includeInterestedInDate) {
            return item.type == GroupShowInterestType.INTERESTED || item.type == GroupShowInterestType.INTERESTED_IN_DATE
        } else {
            return item.type == GroupShowInterestType.INTERESTED
        }
    });

    return interested;
}

const getBooked = (interest: GroupShowInterest[]): GroupShowInterest[] => {
    const booked = interest.filter((item) => {
        return item.type == GroupShowInterestType.BOOKED
    });

    return booked;
}

const getMembersMap = (members: GroupMembership[]): Map<string, User> => {
    let map = new Map<string, User>();
    members.map((member) => {
        map.set(member.user.uid, member.user);
    })
    return map;
}

// const getUser = (uid: String, members: GroupMembership[]): GroupMembership | undefined => {
//     const member: GroupMembership | undefined = members.find((member) => {
//         return member.user.uid === uid
//     });
    
//     return member;
// }

export const GroupInterest = ({variant = GroupInterestVariant.OVERVIEW, ...props}: GroupInterestProps) => {
    return <GroupInterestOverview {...props} />
}

interface ButtonState {
    variant: string,
    icon: IconDefinition
}

export const GroupInterestOverview = ({interest, currentInterestType, members, onInterestedClick, onGoingClick}: GroupInterestProps) => {
    const membersMap = getMembersMap(members);
    const interested = getInterested(interest, true);
    const booked = getBooked(interest);

    let interestedButton: ButtonState = {
        variant: "outline",
        icon: faHeartUnfilled
    }
    let goingButton: ButtonState = {
        variant: "outline",
        icon: faCheckCircleUnfilled
    }
    if(currentInterestType === GroupShowInterestType.INTERESTED) {
        interestedButton = {
            variant: "solid",
            icon: faHeart
        }
    } else if(currentInterestType === GroupShowInterestType.BOOKED) {
        goingButton = {
            variant: "solid",
            icon: faCheckCircle
        }
    }

    return (
        <Flex onClick={() => { console.log("Testing") }}>
            <Stack direction="row">
                <Box p={1} alignContent={"center"}>
                    <Button mr={2} size="sm" onClick={onInterestedClick} variant={interestedButton.variant} leftIcon={<FontAwesomeIcon icon={interestedButton.icon} />} colorScheme="pink">&nbsp;{interested.length} Interested</Button>
                    <AvatarGroup size="sm" mt={2} max={4}>
                        {
                            interested.map((item) => {
                                const memberUser = membersMap.get(item.user.uid);

                                return (
                                    <Avatar key={item.user.uid} name={memberUser ? `${memberUser.firstName} ${memberUser.lastName}` : ''} src={memberUser?.profilePic ? memberUser.profilePic : undefined} />
                                )
                            })
                        }
                    </AvatarGroup>
                </Box>
                <Box p={1} alignContent={"center"}>
                    <Button size="sm" onClick={onGoingClick} variant={goingButton.variant} leftIcon={<FontAwesomeIcon icon={goingButton.icon} />} colorScheme="green">&nbsp;{booked.length} Going</Button>
                    <AvatarGroup size="sm" mt={2} max={4}>
                        {
                            booked.map((item) => {
                                const memberUser = membersMap.get(item.user.uid);

                                return (
                                    <Avatar key={item.user.uid} name={memberUser ? `${memberUser.firstName} ${memberUser.lastName}` : ''} src={memberUser?.profilePic ? memberUser.profilePic : undefined} />
                                )
                            })
                        }
                    </AvatarGroup>
                </Box>
            </Stack>
        </Flex>
    )
}
