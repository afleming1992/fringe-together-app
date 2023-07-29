import { GroupShowInterest, GroupShowInterestType, ShowInfo } from "@/lib/gql/types"
import { Flex, Stack } from "@chakra-ui/react";
import { User } from "@/lib/gql/user";
import { GroupMembership } from "@/lib/gql/group";
import { useInterestModal } from "@/app/group/[groupid]/components/GroupShowsList/GroupInterestModalProvider";
import { GoingButton, InterestedButton } from "./GroupInterestButton";

export enum GroupInterestVariant {
    OVERVIEW="overview"
}

interface GroupInterestProps {
    showInfo: ShowInfo,
    variant?: GroupInterestVariant,
    memberMap: Map<string, User>,
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

const getGoing = (interest: GroupShowInterest[]): GroupShowInterest[] => {
    const booked = interest.filter((item) => {
        return item.type == GroupShowInterestType.BOOKED
    });

    return booked;
}



export const GroupInterest = ({variant = GroupInterestVariant.OVERVIEW, ...props}: GroupInterestProps) => {
    return <GroupInterestOverview {...props} />
}

export const GroupInterestOverview = ({showInfo, memberMap, interest, currentInterestType, onInterestedClick, onGoingClick}: GroupInterestProps) => {
    const { openModal } = useInterestModal();
    const interested = getInterested(interest, true);
    const going = getGoing(interest);

    const onViewClick = (type: GroupShowInterestType) => {
        switch(type) {
            case GroupShowInterestType.INTERESTED:
                openModal(showInfo, type, interested)
                break;
            case GroupShowInterestType.BOOKED:
                openModal(showInfo, type, going)
                break;
        }
    }

    return (
        <Flex>
            <Stack direction="row" alignContent="center">
                <InterestedButton onButtonClick={onInterestedClick} onViewClick={() => {onViewClick(GroupShowInterestType.INTERESTED)}} selected={currentInterestType === GroupShowInterestType.INTERESTED} memberMap={memberMap} interested={interested} />
                <GoingButton onButtonClick={onGoingClick} onViewClick={() => {onViewClick(GroupShowInterestType.BOOKED)}} selected={currentInterestType === GroupShowInterestType.BOOKED} memberMap={memberMap} interested={going} />
            </Stack>
        </Flex>
    )
}
