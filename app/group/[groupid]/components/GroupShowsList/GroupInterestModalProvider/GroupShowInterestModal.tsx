import { GroupShowInterest, GroupShowInterestType, ShowInfo } from "@/lib/gql/types";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, UseDisclosureReturn, ModalBody } from "@chakra-ui/react";

interface GroupShowInterestModal {
    isOpen: boolean,
    onModalClose: () => void,
    type: GroupShowInterestType | null,
    show: ShowInfo | null,
    interestList: GroupShowInterest[]
}


export const GroupShowInterestModal = ({isOpen, onModalClose, type, show, interestList } : GroupShowInterestModal) => {
    let title = null;
    switch(type) {
        case GroupShowInterestType.INTERESTED:
            title = `Interested in ${show?.title}`
            break;
        case GroupShowInterestType.BOOKED:
            title = `Going to ${show?.title}`
            break;
    }

    return (
        <Modal size="xl" isOpen={isOpen} onClose={onModalClose} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ title }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}