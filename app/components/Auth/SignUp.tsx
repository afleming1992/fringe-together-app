'use client';

import { useState } from 'react';
import cn from 'classnames';
import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth, VIEWS } from '../AuthProvider';
import supabase from '@/lib/supabase/browser';
import { AuthResponse } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@apollo/client';
import { createUser } from '@/lib/gql/user';
import apolloClient from '@/lib/apollo/client';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, HStack, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignUp = () => {
    const { setView } = useAuth();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [hideForm, setHideForm] = useState<boolean>(false);

    async function signUp(formData: any) {
        setSuccessMsg('');
        setErrorMsg('');
        setSubmitting(true);

        const authResponse: AuthResponse = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
        });

        if (authResponse.error) {
            setErrorMsg(authResponse.error.message);
            return;
        }
        
        try {
            const { errors } = await apolloClient.mutate({
                mutation: createUser,
                variables: {
                    uid: authResponse.data.user?.id,
                    firstName: formData.firstName,
                    lastName: formData.lastName
                }
            });

            if (errors) {
                setErrorMsg(errors[0].message);
            } else {
                setHideForm(true);
                setSuccessMsg('Success! Please check your email for further instructions.');
            }
        } catch (e) {
            console.log(e);
            setErrorMsg("We didn't quite manage to register you! Please contact support for more information")
        };
        
        
    }

    return (
        <Flex
            minH="20vh"
            align="center"
            justify="center">
            <Stack spacing={8} mx={"auto"} maxW={'lg'} py={12} px={6}>
                <Stack align="center">
                    <Heading size="lg" textAlign="center">Sign Up</Heading>
                    <Text fontSize={'lg'} color={'pink.200'}>
                        Create an Account to use FringeTogether
                    </Text>
                </Stack>
            <Box 
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                {
                    successMsg && 
                    <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                        >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Check your email!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            You&apos;ve registered! Please check your email to verify your account!
                        </AlertDescription>
                    </Alert>
                }
                {
                    errorMsg && 
                    <Alert
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                        >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Somethings not quite right...
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            { errorMsg }
                        </AlertDescription>
                    </Alert>
                }
            {
                !hideForm &&
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                validationSchema={SignUpSchema}
                onSubmit={signUp}
            >
                {({ isValid, dirty }) => (
                    <Form>
                        {errorMsg && <div className="text-red-600 w-full text-center">{errorMsg}</div>}
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <Field name="firstName">
                                    {({ field, form }: any) => (
                                        <FormControl isRequired isInvalid={form.errors.firstName && form.touched.firstName}>
                                            <FormLabel>First Name</FormLabel>
                                            <Input {...field} placeholder="Jane" />
                                            <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                    </Field>
                                </Box>
                                <Box>
                                    <Field name="lastName">
                                        {({ field, form }: any) => (
                                            <FormControl isRequired isInvalid={form.errors.firstName && form.touched.firstName}>
                                                <FormLabel>Last Name</FormLabel>
                                                <Input {...field} placeholder="Doe" />
                                                <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Box>
                            </HStack>
                            <Field name="email">
                                {({ field, form }: any) => (
                                    <FormControl isRequired isInvalid={form.errors.email}>
                                        <FormLabel>Email</FormLabel>
                                        <Input {...field} placeholder="jane.doe@email.com" />
                                        <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name="password">
                                {({ field, form }: any) => (
                                    <FormControl isRequired isInvalid={form.errors.email}>
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" {...field} />
                                        <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </Stack>
                        <Stack spacing={10} pt={4}>
                            <Button
                                type="submit"
                                isLoading={submitting}
                                isDisabled={!dirty || !isValid} 
                                loadingText="Registering..."
                                size="lg"
                                colorScheme="pink"
                                _hover={{
                                bg: 'blue.500',
                                }}>
                                Sign up
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already have an account? <Button variant="link" onClick={() => setView(VIEWS.SIGN_IN)}>Login</Button>
                            </Text>
                        </Stack>
                    </Form>
                )}
            </Formik>  
            }        
            </Box>  
            </Stack>
        </Flex>
    )
}

export default SignUp;