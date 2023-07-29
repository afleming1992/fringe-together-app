import { ProfileCard } from "@/app/components/ProfileCard";
import UserAvatar from "@/app/components/UserAvatar";
import { Group } from "@/lib/gql/group";
import { GroupShowInterest, GroupShowInterestType, ShowInfo } from "@/lib/gql/types";
import { Table, Tr, Td, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, UseDisclosureReturn, ModalBody, TableContainer, Stack, Box, Badge } from "@chakra-ui/react";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface GroupShowInterestModal {
    group: Group | null,
    isOpen: boolean,
    onModalClose: () => void,
    type: GroupShowInterestType | null,
    show: ShowInfo | null,
    interestList: GroupShowInterest[]
}


export const GroupShowInterestModal = ({group, isOpen, onModalClose, type, show, interestList} : GroupShowInterestModal) => {
    let title = null;
    let badgeColor: string = "";
    switch(type) {
        case GroupShowInterestType.INTERESTED:
            title = `Interested in ${show?.title}`
            badgeColor = 'pink'
            break;
        case GroupShowInterestType.BOOKED:
            title = `Going to ${show?.title}`
            badgeColor = 'green'
            break;
    }

    interestList.sort((a, b) => {
        if(a?.date && b?.date) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (a.date) {
            return -1;
        } else if (b.date) {
            return 1;
        } else {
            return 0;
        }
    }) 

    return (
        <Modal size="xl" isOpen={isOpen} onClose={onModalClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ title }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack>
                        {
                            interestList.map((interest) => {
                                console.log(interest);
                                const member = group?.membersMap.get(interest.user.uid);
                                return (
                                    <Box key={member?.uid}>
                                        {
                                            member &&
                                            <ProfileCard user={member} bgColor="gray.800">
                                                {
                                                    interest.date &&
                                                    <Badge colorScheme={badgeColor} fontSize="0.8em">
                                                        <FontAwesomeIcon icon={faCalendar} /> { new Date(interest.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  }
                                                    </Badge>
                                                }
                                            </ProfileCard>
                                        }
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}