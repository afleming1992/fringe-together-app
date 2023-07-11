"use client";

import { Group, getGroupById } from "@/lib/gql/group";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

interface GroupContextData {
    group: Group | null
    refresh: () => void
}

export const GroupContext = createContext<GroupContextData>({group: null, refresh: () => {}})

interface GroupProviderProps {
    groupId: number,
    children: any
}

export const GroupProvider = ({groupId, ...props} : GroupProviderProps) => {
    const [group, setGroup] = useState<Group | null>(null);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            if(groupId) { 
                const data: Group = await getGroupById(groupId);
                console.log(data);
                setGroup(data);
            }
            setIsRefreshing(false);
        };
        getData();
    },[groupId, isRefreshing])

    const value = useMemo(() => {
        const triggerRefresh = () => {
            console.log("Trigger Refresh");
            setIsRefreshing(true);
        }

        return {
            group,
            refresh: triggerRefresh
        };
    }, [group, setIsRefreshing]);

    return <GroupContext.Provider value={value} {...props} />
}

export const useGroup = () => {
    const context = useContext(GroupContext);
    if(context === undefined) {
        throw new Error("useGroup must be used within a GroupProvider")
    }
    return context;
}
