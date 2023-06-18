"use client";

import { Group, getGroupById } from "@/lib/gql/group";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

interface GroupContextData {
    group: Group | null
}

export const GroupContext = createContext<GroupContextData>({group: null})

interface GroupProviderProps {
    groupId: number,
    children: any
}

export const GroupProvider = ({groupId, ...props} : GroupProviderProps) => {
    const [group, setGroup] = useState<Group | null>(null);

    useEffect(() => {
        const getData = async () => {
            if(groupId) {
                const data: Group = await getGroupById(groupId);
                setGroup(data);
            }
        };
        getData();
    },[groupId])

    const value = useMemo(() => {
        return {
            group
        };
    }, [group]);

    return <GroupContext.Provider value={value} {...props} />
}

export const useGroup = () => {
    const context = useContext(GroupContext);
    if(context === undefined) {
        throw new Error("useGroup must be used within a GroupProvider")
    }
    return context;
}
