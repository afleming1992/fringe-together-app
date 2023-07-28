import { GroupShowInterest, GroupShowInterestType, ShowInfo } from "@/lib/gql/types";
import { useDisclosure } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { GroupShowInterestModal } from "./GroupShowInterestModal";

interface GroupInterestModalProviderProps {
    children: any
}

export interface GroupInterestModalContextData {
    openModal: (show: ShowInfo, type: GroupShowInterestType, interestList: GroupShowInterest[]) => void
}

export const GroupInterestModalContext = createContext<GroupInterestModalContextData>({openModal: () => {}});

export const GroupShowModalProvider = ({children, ...props}: GroupInterestModalProviderProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ show, setShow ] = useState<ShowInfo | null>(null);
    const [ type, setType ] = useState<GroupShowInterestType | null>(null);
    const [ interestList, setInterestList ] = useState<GroupShowInterest[]>([]);

    const onReset = useCallback(() => {
        setInterestList([]);
        setShow(null);
        setType(null);
    },[setShow, setType]);

    const onModalClose = useCallback(() => {
        onClose();
        onReset();
    },[onReset, onClose]);
    
    const value = useMemo(() => {
        const openModal = async (show: ShowInfo, type: GroupShowInterestType, interestList: GroupShowInterest[]) => {
            console.log("FIRE");
            setShow(show);
            setType(type);
            setInterestList(interestList);
            onOpen();
        }

        return {
            openModal: openModal
        }
    },[onOpen]);

    return (
        <GroupInterestModalContext.Provider value={value} {...props}>
            <GroupShowInterestModal isOpen={isOpen} onModalClose={() => onModalClose()} type={type} show={show} interestList={interestList} />
            {children}
        </GroupInterestModalContext.Provider>
    );
}

export const useInterestModal = () => {
    const context = useContext(GroupInterestModalContext);
    if(context === undefined) {
        throw new Error('useAddShow must be used within a ShowProvider');
    }
    return context;
}