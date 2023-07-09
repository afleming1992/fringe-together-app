import { Show } from "@/lib/gql/types";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Link, Stack, Text, Grid, GridItem } from "@chakra-ui/react";
import ShowTicketLink from "@/app/components/ShowTicketLink";

interface ShowPreviewCard {
    show: Show,
    showDescription?: boolean
    showCta?: boolean
}

const ShowPreviewCard = ({show, showDescription = true, showCta = true}: ShowPreviewCard) => {
    return (
        <Card 
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
        >
            <Stack>
                <CardBody>
                    <Heading size="md" mb={2}>{show.title}</Heading>
                    <Heading color="gray.400" size="sm"><FontAwesomeIcon icon={faLocationDot} /> {show.location}</Heading>
                    <Grid my={2} templateColumns='repeat(3, 1fr)' gap={3}>
                        <GridItem>
                            <Heading color="gray.400" size="sm"><FontAwesomeIcon icon={faClock} /> {show.duration}</Heading>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Heading color="gray.400" size="sm"><FontAwesomeIcon icon={faCalendar} /> {show.showRun}</Heading>
                        </GridItem>
                    </Grid>
                    {
                        showDescription &&
                        <Text fontSize="sm" mt="2" py='2'>
                            {show.description}
                        </Text>
                    }
                </CardBody>
                {
                    showCta &&
                    <>
                        <Divider />
                        <CardFooter>
                            <ButtonGroup spacing='2'>
                                <Button as={Link} href={show.uri} isExternal rightIcon={<ExternalLinkIcon />} variant='solid' colorScheme='green'>
                                    edfringe.com Page
                                </Button>
                                <ShowTicketLink showLink={show.uri} showDes />
                            </ButtonGroup>
                        </CardFooter>
                    </>
                }
            </Stack>
        </Card>
    );
}

export default ShowPreviewCard;