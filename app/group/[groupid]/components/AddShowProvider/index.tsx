import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,  ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import GetShowForm from "./GetShowForm";
import { Show } from "@/lib/gql/types";
import GetShowConfirmation from "./GetShowConfirmation";
import { Group, addShowInterest } from "@/lib/gql/group";
import { GroupShowInterestType } from "@prisma/client";
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
        const updateInterest = async (showUri: string, type: GroupShowInterestType | null, date?: Date | null) => {
            if(group) {
                const result = await addShowInterest(group.id, GroupShowInterestType.INTERESTED, showUri, date);
    
                if(result) {
                    onModalClose();
                    toast({
                        status: 'success',
                        position: 'top',
                        title: 'Show Interest added!',
                        description: `Your interest for ${result.show.title} has been registered!`
                    })
                    refresh();
                }
            }
        }

        return {
            openModal: () => onOpen(),
            confirmInterested: (showUri: string, date?: Date) => { confirmedInterested(showUri, date) }
        }
    }, [onOpen, group, refresh, onModalClose, toast]);

    

    const confirmedBooked = (date: Date) => {
            
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
                            <GetShowConfirmation show={show} confirmBooked={confirmedBooked} confirmInterested={value.confirmInterested} confirmNo={confirmedNo} />
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