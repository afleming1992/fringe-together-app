import { Show } from "@/lib/gql/show_remote";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent,  ModalFooter,  ModalHeader,  ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useMemo, useState } from "react";
import GetShowForm from "./GetShowForm";

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

    return (
        <AddShowContext.Provider value={value} {...props}>
            <Modal size="xl" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Show</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            !show &&
                            <GetShowForm setShow={setShow} />
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