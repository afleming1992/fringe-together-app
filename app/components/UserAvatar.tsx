"use client";

import { User } from "@/lib/gql/user";
import { Avatar, AvatarBadge, Stack } from "@chakra-ui/react";
import { AnyMxRecord } from "dns";
import { ReactNode } from "react";

interface UserAvatarProps {
    user: User | null | undefined
    ref?: any,
    size?: string,
    showName?: boolean,
    badge?: ReactNode
}

const UserAvatar = ({user, ref, size = "sm", showName = false, badge = <></>}: UserAvatarProps) => {
    if(user) {
        return (
            <Avatar size={size} ref={ref} name={`${user.firstName} ${user.lastName}`} src={`${user.profilePic}`}>
                { badge }
            </Avatar>
        )
    } else {
        return (
            <Avatar size={size}>
                <AvatarBadge>
                    {badge}
                </AvatarBadge>
            </Avatar>
        )
    }
   
}

export default UserAvatar