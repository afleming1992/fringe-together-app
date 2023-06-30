import { Button, Link } from "@chakra-ui/react";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ShowTicketLinkProps {
    showLink: string
    date?: Date | null
}

const ShowTicketLink = ({showLink, date = null}: ShowTicketLinkProps) => {
    let url = showLink;
    if(date) {
        url = url + `?day=${ date.toLocaleDateString().split('T')[0] }`
    } else {
        // Fringe Website only opens the booking screen if there is a day so setting this so it opens the page
        url = url + `?day=01-08-2023`
    }
   
    return (
        <Button as={Link} leftIcon={<FontAwesomeIcon icon={faTicket} />} colorScheme="pink" href={url} isExternal>
            Book Show
        </Button>
    )
}

export default ShowTicketLink;