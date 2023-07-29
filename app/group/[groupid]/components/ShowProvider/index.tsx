import { Box, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader,  ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import GetShowForm from "./GetShowForm";
import { GroupShowInterestType, Show } from "@/lib/gql/types";
import GetShowConfirmation from "./GetShowConfirmation";
import { Group, updateShowInterest } from "@/lib/gql/group";
import { useGroup } from "@/app/group/context/group";
import { getShow } from "@/lib/gql/show";
import { SimpleLoading } from "@/app/components/Loading";
import { ShowInterestAndDateSelector } from "./ShowInterestAndDateSelection";
import ShowPreviewCard from "./ShowPreviewCard";

interface AddShowProviderProps {
    group: Group,
    children: any
}

export interface AddShowContextData {
    openModal: any,
    openModalForDate: (interest: GroupShowInterestType, showUri: string) => void,
    updateInterest: any
}

export const ShowContext = createContext<AddShowContextData>({openModal: () => {}, openModalForDate: () => {}, updateInterest: () => {}}) 

export const ShowProvider = ({children, ...props} : AddShowProviderProps) => {
    const toast = useToast();
    const { group, refresh } = useGroup();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ show, setShow ] = useState<Show | null>();
    const [ confirmed, setConfirmed ] = useState<boolean>(false);
    const [ gettingShow, setGettingShow ] = useState<boolean>(false);

    const [ showUri, setShowUri ] = useState<string | null>(null)
    const [ type, setType ] = useState<GroupShowInterestType | null>(null);

    const onReset = useCallback(() => {
        setGettingShow(false);
        setConfirmed(false);
        setShowUri(null)
        setShow(null);
        setType(null);
    },[setShow, setType]);

    const onModalClose = useCallback(() => {
        onReset()
        onClose();
    },[onReset, onClose]);

    useEffect(() => {
        const getShowData = async (showUri: string) => {
            setGettingShow(true);
            try {
                const show = await getShow(showUri);
                setShow(show);
            } catch (error) {
                console.error(error);
            } finally {
                setGettingShow(false);
            }
        }

        if(showUri) {
            getShowData(showUri);
        }
    }, [showUri]);

    const value = useMemo(() => {
        const updateInterest = async (showUri: string, type: GroupShowInterestType, date?: Date | null) => {
            if(group) {
                const strippedShowUri = showUri.split('?')[0];
                if(!date) {
                    date = undefined;
                }
                const result = await updateShowInterest(group.id, type, strippedShowUri, date);
    
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
            openModalForDate: (interest: GroupShowInterestType, showUri: string) => {
                setType(interest);
                setConfirmed(true);
                setShowUri(showUri);
                onOpen();
            },
            updateInterest: (showUri: string, type: GroupShowInterestType, date?: Date) => { updateInterest(showUri, type, date) }
        }
    }, [group, toast, onModalClose, refresh, onOpen]);

    return (
        <ShowContext.Provider value={value} {...props}>
            <Modal size="xl" isOpen={isOpen} onClose={onModalClose} closeOnOverlayClick={false}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Show</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            !show && !gettingShow &&
                            <GetShowForm setShowUri={setShowUri} />
                        }
                        {
                            !show && gettingShow &&
                            <Box alignContent="center">
                                <SimpleLoading message="Getting Show Details..." />
                            </Box>
                        }
                        {
                            show &&
                            <>
                                <ShowPreviewCard showDescription={true} showCta={true} show={show} />
                                <Divider my={2} />
                                {
                                    !confirmed &&
                                    <GetShowConfirmation yes={() => { setConfirmed(true) }} no={() => { onModalClose() } } />
                                }
                                {
                                    confirmed &&
                                    <ShowInterestAndDateSelector type={type} setType={setType} show={show} updateInterest={(date?: Date) => {
                                        if (type) {
                                            value.updateInterest(show.uri, type, date);
                                        }
                                    }} />
                                }
                            </>
                        }   
                    </ModalBody>
                </ModalContent>
            </Modal>
            {children}
        </ShowContext.Provider>
    );


}

export const useAddShow = () => {
    const context = useContext(ShowContext);
    if(context === undefined) {
        throw new Error('useAddShow must be used within a ShowProvider');
    }
    return context;
}