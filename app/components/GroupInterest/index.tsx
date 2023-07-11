import { GroupShow, GroupShowInterest, GroupShowInterestType } from "@/lib/gql/types"
import { AvatarBadge, AvatarGroup, Badge, Box, Button, ButtonGroup, Flex, Stack, useId } from "@chakra-ui/react";
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

export const GroupInterestOverview = ({interest, currentInterestType, onInterestedClick, onGoingClick}: GroupInterestProps) => {
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
            <ButtonGroup size="sm">
                <Button onClick={onInterestedClick} variant={interestedButton.variant} leftIcon={<FontAwesomeIcon icon={interestedButton.icon} />} colorScheme="pink">&nbsp;{interested.length} Interested</Button>
                <Button onClick={onGoingClick} variant={goingButton.variant} leftIcon={<FontAwesomeIcon icon={goingButton.icon} />} colorScheme="green">&nbsp;{booked.length} Booked</Button>
            </ButtonGroup>

            {/* <Stack direction='row'>
                {
                    booked.length > 0 &&
                    <Badge variant="solid" colorScheme="green">
                        <FontAwesomeIcon icon={faTicketAlt} /> {interested.length} Booked
                    </Badge>
                }
                {
                    interested.length > 0 &&
                    <Badge variant="solid" colorScheme="blue">
                        <FontAwesomeIcon icon={faHeart} /> {interested.length} Interested
                    </Badge>
                }
            </Stack> */}
        </Flex>
    )
}
