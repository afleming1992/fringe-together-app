import { useAuth } from "@/app/components/AuthProvider";
import { getShowTicketLink } from "@/app/components/ShowTicketLink";
import { addShowInterest } from "@/lib/gql/group";
import { GroupShow } from "@/lib/gql/types";
import { Button, Divider, Icon, Link, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useColorModeValue, useToast } from "@chakra-ui/react";
import { faCheck, faEllipsis, faExternalLinkSquare, faHeart, faHeartBroken, faTicketSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import { useAddShow } from "../AddShowProvider";

interface GroupShowItemMenuProps {
    groupShow: GroupShow
    currentUser: User
}

const GroupShowItemMenu = ({groupShow, currentUser} : GroupShowItemMenuProps) => {
    const toast = useToast();
    const { confirmInterested } = useAddShow();
    

    const onInterestedClick = () => {
        toast({
            title: 'Registering interest...',
            position: 'top',
            status: 'info',
            duration: 5000
        })
        confirmInterested(groupShow.show.uri);
    }

    let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
    let iconColor = useColorModeValue("brand.200", "white");

    const interest = groupShow.interest.find((entry) => {
        return entry.user.uid === currentUser.uid
    });

    return (
        <Menu>
            <MenuButton as={Button} bg={iconBox}>
                <Icon
                    w='24px'
                    h='24px'
                    color={iconColor}
                    >
                        <FontAwesomeIcon icon={faEllipsis} />
                    </Icon>
            </MenuButton>
            <MenuList>
                <MenuGroup title='Status'>
                    {
                        interest &&
                        <>
                            <MenuItem isDisabled={true} icon={<FontAwesomeIcon icon={faHeartBroken} />}>Remove Interest</MenuItem>
                        </>
                    }
                    {
                        interest === undefined &&
                        <>
                            <MenuItem onClick={() => { onInterestedClick(); }} icon={<FontAwesomeIcon icon={faHeart} />}>I&apos;m Interested!</MenuItem>
                            <MenuItem isDisabled={true} icon={<FontAwesomeIcon icon={faCheck} />}>I&apos;ve booked!</MenuItem>
                        </>
                    }   
                </MenuGroup>
                <MenuGroup title="Tickets">
                    <MenuItem as={Link} href={getShowTicketLink(groupShow.show.uri)} isExternal icon={<FontAwesomeIcon icon={faTicketSimple} />}>Get Tickets</MenuItem>                                                  
                </MenuGroup>
                <MenuGroup title="Links">
                <MenuItem as={Link} href={groupShow.show.uri} isExternal icon={<FontAwesomeIcon icon={faExternalLinkSquare} />}>EdFringe.com</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default GroupShowItemMenu;