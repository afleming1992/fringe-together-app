"use client";

import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useAuth } from '../AuthProvider';
import UserAvatar from '../UserAvatar';
import { useEffect } from 'react';

const SignedInMenu = () => {
    const { profile, signOut } = useAuth();

    return (
        <Menu>
            <MenuButton>
                <UserAvatar user={profile} />
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
            </MenuList>
        </Menu>
    );
}

export default SignedInMenu;