'use client';

import NextLink from 'next/link';
import { Session } from '@supabase/auth-helpers-nextjs';
import { VIEWS, useAuth } from '../AuthProvider';
import SignedInMenu from './SignedInMenu';
import { Box, Flex, IconButton, useColorModeValue, useDisclosure, Text, useBreakpointValue, Button, Stack, Collapse, Link, Popover, PopoverTrigger, PopoverContent, Container, HStack, Spinner } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { ReactNode } from 'react';

interface NavbarProps {
    session: Session | null
}

interface Link {
    name: string,
    href: string
}

const Links: Link[] = [{
    name:"My Groups",
    href:"/"
}]

const NavBar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const { initial, session, profile, setView } = useAuth();

    return  (
        <>
            <Box borderBottom={"1px"} borderColor={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={"center"} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={onToggle}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Text
                            as={NextLink}
                            href={"/"}
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('gray.800', 'white')}
                            fontWeight={700}
                            fontSize={'2xl'}>
                            Fringe<Text display="inline" color="pink.400">Together</Text>
                        </Text>
                        {
                            session &&
                            <HStack
                                as={'nav'}
                                spacing={4}
                                display={{ base: 'none', md: 'flex' }}>
                                {Links.map((link) => (
                                    <NavLink key={link.name} link={link} />
                                ))}
                            </HStack>
                        }
                    </HStack>
                    <Flex alignItems={'center'}>
                        {
                            profile &&
                            <SignedInMenu />
                        }
                        {
                            !profile && session &&
                            <Spinner color="pink" />
                        }
                        {
                            !session &&
                            <>
                                <Button size={"sm"} bg="pink.400" onClick={() => setView(VIEWS.SIGN_IN)}>
                                    Sign In
                                </Button>
                            </>
                        }
                    </Flex>
                </Flex>
                {
                    session &&
                    <Collapse in={isOpen}>
                        <Box pb={4} display={{ md: 'none' }}>
                            <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.name} link={link} />
                            ))}
                            </Stack>
                        </Box>
                    </Collapse>
                }
            </Box>
        </>
    )
}

const NavLink = ({link}: { link: Link }) => {
    return (
        <Link
            p={2}
            fontSize={'sm'}
            fontWeight={500}
            rounded={'lg'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={link.href}>
            {link.name}
        </Link>
    );
}

export default NavBar;