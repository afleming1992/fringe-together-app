"use client";

import { User } from "@/lib/gql/user";
import { Avatar } from "@chakra-ui/react";

interface UserAvatarProps {
    user: User | null
    ref?: any
}

const UserAvatar = ({user, ref}: UserAvatarProps) => {
    if(user) {
        return (
            <Avatar size={"sm"} ref={ref} name={`${user.first_name} ${user.last_name}`} src={`${user.profile_pic}`} />
        )
    } else {
        return (
            <Avatar size={"sm"} />
        )
    }
   
}

export default UserAvatar