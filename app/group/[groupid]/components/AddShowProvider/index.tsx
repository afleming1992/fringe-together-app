import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,  ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import GetShowForm from "./GetShowForm";
import { GroupShowInterestType, Show } from "@/lib/gql/types";
import GetShowConfirmation from "./GetShowConfirmation";
import { Group, updateShowInterest } from "@/lib/gql/group";
import { useGroup } from "@/app/group/context/group";

interface AddShowProviderProps {
    group: Group,
    children: any
}

export interface AddShowContextData {
    openModal: any,
    updateInterest: any
}

export const AddShowContext = createContext<AddShowContextData>({openModal: () => {}, updateInterest: () => {}}) 

export const AddShowProvider = ({children, ...props} : AddShowProviderProps) => {
    const toast = useToast();
    const { group, refresh } = useGroup();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ show, setShow ] = useState<Show | null>();

    const onModalClose = useCallback(() => {
        setShow(null);
        onClose();
    },[setShow, onClose]);

    const value = useMemo(() => {
        const updateInterest = async (showUri: string, type: GroupShowInterestType, date?: Date | null) => {
            if(group) {
                const result = await updateShowInterest(group.id, type, showUri, date);
    
                if(result) {
                    toast({
                        status: 'success',
                        title: 'Your show has been updated',
                        position: 'top',
                        duration: 3000,
                    })
                    onModalClose();
                    refresh();
                }
            }
        }

        return {
            openModal: () => onOpen(),
            updateInterest: (showUri: string, type: GroupShowInterestType, date?: Date) => { updateInterest(showUri, type, date) }
        }
    }, [onOpen, group, refresh, onModalClose, toast]);

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
                            <GetShowConfirmation show={show} updateInterest={value.updateInterest} confirmNo={() => {onModalClose()}} />
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