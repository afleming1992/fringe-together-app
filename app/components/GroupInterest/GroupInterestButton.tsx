import { GroupShowInterest, GroupShowInterestType } from "@/lib/gql/types"
import { Button, AvatarGroup, Avatar, Box } from "@chakra-ui/react"
import { faHeart, faCheckCircle, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeartUnfilled, faCheckCircle as faCheckCircleUnfilled } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useGroup } from "@/app/group/context/group";

interface ButtonState {
    text: string
    colorScheme: string,
    variant: string,
    icon: IconDefinition
}

interface SpecificGroupInterestButtonProps {
    selected: boolean,
    onButtonClick: () => void,
    onViewClick:  () => void,
    interested: GroupShowInterest[]
}

interface GroupInterestButtonProps {
    type: GroupShowInterestType,
    buttonState: ButtonState,
    onButtonClick: () => void,
    onViewClick: () => void,
    interested: GroupShowInterest[]
}

const GroupInterestButton = ({onButtonClick, onViewClick, interested, buttonState}: GroupInterestButtonProps) => {
    const { group } = useGroup();
    
    return (
        <Box p={1} alignContent={"center"}>
            <Button width="full" mr={2} mb={1} size="sm" onClick={onButtonClick} variant={buttonState.variant} leftIcon={<FontAwesomeIcon icon={buttonState.icon} />} colorScheme={buttonState.colorScheme}>&nbsp;{interested.length} {buttonState.text}</Button>
            {
                interested.length > 0 &&
                <Box rounded={"lg"} p={0.5} _hover={{background: 'gray.600', cursor: 'pointer'}} onClick={onViewClick}>
                    <AvatarGroup size="sm" max={4} onClick={() => {onViewClick}}>
                        {
                            interested.map((item) => {
                                let memberUser = null;
                                if(group?.membersMap) {
                                    memberUser = group?.membersMap.get(item.user.uid);
                                }

                                return (
                                    <Avatar key={item.user.uid} name={memberUser ? `${memberUser.firstName} ${memberUser.lastName}` : ''} src={memberUser?.profilePic ? memberUser.profilePic : undefined} />
                                )
                            })
                        }
                    </AvatarGroup>
                </Box>
            }
        </Box>
    );
} 

export const InterestedButton = ({selected, ...props}: SpecificGroupInterestButtonProps) => {
    let buttonState: ButtonState = {
        text: "Interested",
        colorScheme: "pink",
        variant: "outline",
        icon: faHeartUnfilled
    }
    if(selected) {
        buttonState = {
        text: "Interested",
        colorScheme: "pink",
        variant: "solid",
        icon: faHeart
        }
    }

    return <GroupInterestButton type={GroupShowInterestType.INTERESTED} buttonState={buttonState} {...props} />
}

export const GoingButton = ({selected, ...props}: SpecificGroupInterestButtonProps) => {
    let buttonState: ButtonState = {
        text: "Going",
        colorScheme: "green",
        variant: "outline",
        icon: faCheckCircleUnfilled
    }
    if(selected) {
        buttonState = {
            text: "Going",
            colorScheme: "green",
            variant: "solid",
            icon: faCheckCircle
        }
    }

    return <GroupInterestButton type={GroupShowInterestType.INTERESTED} buttonState={buttonState} {...props} />
}