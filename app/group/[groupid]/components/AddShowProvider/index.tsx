import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,  ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useMemo, useState } from "react";
import GetShowForm from "./GetShowForm";
import { Show } from "@/lib/gql/types";
import GetShowConfirmation from "./GetShowConfirmation";

interface AddShowProviderProps {
    children: any
}

export interface AddShowContextData {
    openModal: any
}

export const AddShowContext = createContext<AddShowContextData>({openModal: () => {}})

export const AddShowProvider = ({children, ...props} : AddShowProviderProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ show, setShow ] = useState<Show | null>();

    const value = useMemo(() => {
        return {
            openModal: () => onOpen(),
        }
    }, [onOpen]);

    const onModalClose = () => {
        setShow(null);
        onClose();
    }

    const confirmedBooked = (date: Date) => {

    }

    const confirmedInterested = (date?: Date | null = null) => {

    }

    const confirmedNo = () => {
        setShow(null)
    }

    return (
        <AddShowContext.Provider value={value} {...props}>
            <Modal size="xl" isOpen={isOpen} onClose={onModalClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Show</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            !show &&
                            <GetShowForm setShow={setShow} />
                        }
                        {
                            show &&
                            <GetShowConfirmation  mation show={show} confirmBooked={confirmedBooked} confirmInterested={confirmedInterested} confirmNo={confirmedNo} />
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>
            {children}
        </AddShowContext.Provider>
    );
}

export const useAddShow = () => {
    const context = useContext(AddShowContext);
    if(context === undefined) {
        throw new Error('useAddShow must be used within a AddShowProvider');
    }
    return context;
}