import { GroupShow, GroupShowInterest, GroupShowInterestType } from "@/lib/gql/types"
import { AvatarBadge, AvatarGroup, Badge, Box, Button, ButtonGroup, Flex, Stack, useId } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import { User } from "@/lib/gql/user";
import { GroupMembership } from "@/lib/gql/group";
import { faCheck, faHeart, faTicketSimple, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartUnfilled, faCheckCircle as faCheckCircleUnfilled } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum GroupInterestVariant {
    OVERVIEW="overview"
}

interface GroupInterestProps {
    variant?: GroupInterestVariant,
    members: GroupMembership[],
    interest: GroupShowInterest[]
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

const buildAvatarGroup = (interested: GroupShowInterest[], members: GroupMembership[]) => {
    return (
        <AvatarGroup spacing={"0.5"} size='sm' max={4}>
            {
                interested.map((item) => {
                    const member: GroupMembership | undefined = members.find((member) => {
                        return member.user.uid == item.user.uid
                    });
                    
                    if(!member) return <>Hello</>

                    return (
                        <UserAvatar key={item.user.uid} user={member.user} />
                    )
                })
            }
        </AvatarGroup>
    )
}

const getUser = (uid: String, members: GroupMembership[]): GroupMembership | undefined => {
    const member: GroupMembership | undefined = members.find((member) => {
        return member.user.uid === uid
    });
    
    return member;
}

export const GroupInterest = ({variant = GroupInterestVariant.OVERVIEW, ...props}: GroupInterestProps) => {
    return <GroupInterestOverview {...props} />
}

export const GroupInterestOverview = ({interest, members}: GroupInterestProps) => {
    const interested = getInterested(interest, true);
    const booked = getBooked(interest);

    return (
        <Flex onClick={() => { console.log("Testing") }}>
            
            <ButtonGroup variant="outline" size="sm">
                <Button leftIcon={<FontAwesomeIcon icon={faHeartUnfilled} />} colorScheme="pink">&nbsp;{interested.length} Interested</Button>
                <Button leftIcon={<FontAwesomeIcon icon={faCheckCircleUnfilled} />} colorScheme="green">&nbsp;{booked.length} Booked</Button>
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
