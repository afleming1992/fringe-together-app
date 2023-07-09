'use client';

import NextLink from 'next/link';
import { Session } from '@supabase/auth-helpers-nextjs';
import { VIEWS, useAuth } from '../AuthProvider';
import SignedInMenu from './SignedInMenu';
import { Box, Flex, IconButton, useColorModeValue, useDisclosure, Text, useBreakpointValue, Button, Stack, Collapse, Link, Popover, PopoverTrigger, PopoverContent, Container } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

interface NavbarProps {
    session: Session | null
}

const NavBar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const { initial, session, profile, setView } = useAuth();

    return  (
        <Container maxWidth={"6xl"} mb="5">
        <Box>
            <Flex 
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={"60px"}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}>
                    <Flex
                        flex={{ base:1, md: 'auto' }}
                        ml={{ base: -2 }}
                        display={{ base: 'flex', md: 'none' }}>
                        <IconButton as={NextLink}
                            href={'/'}
                            variant='ghost'
                            aria-label="Home"
                        >
                            <FontAwesomeIcon icon={faHome} />
                        </IconButton>
                        {/* <IconButton
                            onClick={onToggle}
                            icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                            }
                            variant={'ghost'}
                            aria-label={'Toggle Navigation'}
                        /> */}
                    </Flex>
                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
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

                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav />
                        </Flex>
                    </Flex>
                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify={'flex-end'}
                        direction={'row'}
                        spacing={6}>
                        { !session && (
                            <>
                                <Button
                                    as={'a'}
                                    fontSize={'sm'}
                                    fontWeight={400}
                                    variant={'link'}
                                    onClick={() => setView(VIEWS.SIGN_IN)}>
                                    Sign In
                                </Button>
                                <Button
                                    as={'a'}
                                    display={{ base: 'none', md: 'inline-flex'}}
                                    fontSize={'sm'}
                                    fontWeight={600}
                                    color={'white'}
                                    bg={'pink.400'}
                                    href={"#"}
                                    _hover={{
                                        bg: 'pink.500'
                                    }}
                                    onClick={() => setView(VIEWS.SIGN_UP)}>
                                        Sign Up
                                </Button>
                            </>
                        )}
                        { session && (
                            <>
                                <SignedInMenu />
                            </>
                        )}
                    </Stack>
                </Flex>
                <Collapse in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Box>
        </Container>
    )
}

interface DesktopNavProps {

}

const DesktopNav = (props: DesktopNavProps) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack direction={'row'} align={"center"} spacing={4}>
            <Box>
                <Link
                    p={2}
                    href={'#'}
                    fontSize={'sm'}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                    }}> 
                    Text
                </Link>
            </Box>
        </Stack>
    )
}

const MobileNav = () => {
    return (
        <></>
    )
}

export default NavBar;