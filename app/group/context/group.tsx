"use client";

import { useAuth } from "@/app/components/AuthProvider";
import { Group, getGroupById } from "@/lib/gql/group";
import { User } from "@/lib/gql/user";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

interface GroupContextData {
    group: Group | null,
    isGroupAdmin: boolean,
    refresh: () => void
}

export const GroupContext = createContext<GroupContextData>({group: null, isGroupAdmin: false, refresh: () => {}})

interface GroupProviderProps {
    groupId: number,
    children: any
}

const isUserAdmin = (user: User, group: Group): boolean => {
    const found = group.members.filter((member) => {
        return member.admin;
    }).find((admin) => {
        return admin.user.uid === user.uid
    });

    return found !== undefined;
}

export const GroupProvider = ({groupId, ...props} : GroupProviderProps) => {
    const { profile } = useAuth();
    const [group, setGroup] = useState<Group | null>(null);
    const [isGroupAdmin, setIsGroupAdmin] = useState<boolean>(false);
    const [isRefreshing, setIsRefreshing] = useState<boolean>(true);

    useEffect(() => {
        console.log("Group");
        setGroup(null);
        const getData = async () => {
            if(groupId) { 
                const data: Group = await getGroupById(groupId);
                setGroup(data);
            }
            setIsRefreshing(false);
        };

        getData();
    },[groupId, isRefreshing])

    useEffect(() => {
        if(profile && group) {
            setIsGroupAdmin(isUserAdmin(profile, group))
        }
    }, [group, profile]) 

    const value = useMemo(() => {
        const triggerRefresh = () => {
            console.log("Trigger Refresh");
            setIsRefreshing(true);
        }

        return {
            group,
            isGroupAdmin,
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
