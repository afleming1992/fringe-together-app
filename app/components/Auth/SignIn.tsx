'use client';

import { useState } from 'react';
import cn from 'classnames';

import { useAuth, VIEWS } from '../AuthProvider';
import supabase from '@/lib/supabase/browser';

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

const SignIn = () => {
    const { setView } = useAuth();
    const [ submitting, setSubmitting ] = useState<boolean>(false);
    const [ errorMsg, setErrorMsg ] = useState<string | null>(null);

    async function signIn(formData: any) {
        setSubmitting(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if(error) {
            setErrorMsg(error.message);
        } else {
            setView(null);
        }
        setSubmitting(false);
    }

    return (
        <Flex
            minH="20vh"
            align="center"
            justify="center">
                <Stack spacing={8} mx="auto" maxW="xl" py={12} px={6}>
                    <Stack align="center">
                        <Heading size="lg" textAlign="center">
                            Sign in to Fringe<Text as="span" color="pink.400">Together</Text>
                        </Heading>
                    </Stack>
                    <Box
                        rounded='lg'
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        {
                            errorMsg && 
                            <Alert status='error' variant='left-accent' mb={2}>
                                <AlertIcon />
                                {errorMsg}
                            </Alert>
                        }
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={SignInSchema}
                            onSubmit={signIn}
                        >
                            {({ isValid, dirty }) => (    
                                <Form>
                                    <Stack spacing={4}>
                                        <Field name="email">
                                            {({ field, form }: any) => (
                                                <FormControl isRequired isInvalid={form.errors.email}>
                                                    <FormLabel>Email</FormLabel>
                                                    <Input {...field} placeholder="jane.doe@email.com" />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Field name="password">
                                            {({ field, form }: any) => (
                                                <FormControl isRequired isInvalid={form.errors.password}>
                                                    <FormLabel>Password</FormLabel>
                                                    <Input type="password" {...field} />
                                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                    </Stack>
                                    <Stack spacing={10} pt={4}>
                                        <Stack justifyContent={"right"}>
                                            <Link>Forgot password?</Link>
                                        </Stack>
                                        <Button
                                            type="submit"
                                            isLoading={submitting}
                                            isDisabled={!dirty || !isValid} 
                                            loadingText="Signing In..."
                                            size="lg"
                                            colorScheme="pink">
                                            Sign In
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Stack>
        </Flex>
    );
}

export default SignIn;
