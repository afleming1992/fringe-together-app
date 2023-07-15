import { getShowTicketLink } from "@/app/components/ShowTicketLink";
import { GroupShow } from "@/lib/gql/types";
import { Button, Icon, IconButton, Link, Menu, MenuButton, MenuGroup, MenuItem, MenuList, useColorModeValue, useToast } from "@chakra-ui/react";
import { faEllipsis, faExternalLinkSquare, faHeart, faHeartBroken, faTicketSimple } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";

interface GroupShowItemMenuProps {
    groupShow: GroupShow
    currentUser: User
}

const GroupShowItemMenu = ({groupShow, currentUser} : GroupShowItemMenuProps) => {
    let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
    let iconColor = useColorModeValue("brand.200", "white");

    return (
        <Menu>
            <MenuButton size="sm" as={IconButton} bg={iconBox}>
                <Icon
                    color={iconColor}
                    >
                        <FontAwesomeIcon icon={faEllipsis} />
                    </Icon>
            </MenuButton>
            <MenuList>
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