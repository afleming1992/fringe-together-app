"use client";

import { User } from "@/lib/gql/user";
import { Avatar } from "@chakra-ui/react";
import { AnyMxRecord } from "dns";

interface UserAvatarProps {
    user: User | null
    ref?: any,
    size?: string,
    showName?: boolean
}

const UserAvatar = ({user, ref, size = "sm", showName = false}: UserAvatarProps) => {
    if(user) {
        return (
            <Avatar size={size} ref={ref} name={`${user.firstName} ${user.lastName}`} src={`${user.profilePic}`} />
        )
    } else {
        return (
            <Avatar size={size} />
        )
    }
   
}

export default UserAvatar