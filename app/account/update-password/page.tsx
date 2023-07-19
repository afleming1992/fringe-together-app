"use client";

import { useAuth } from "@/app/components/AuthProvider";
import supabase from "@/lib/supabase/browser";
import { useColorModeValue, Box, Button, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Stack, Flex, FormErrorMessage, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from 'yup';

export const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string().required('Password must be re-entered').oneOf([Yup.ref('password'), null], "Passwords must match")
})

export const UpdatePassword = () => {
    const { user } = useAuth();
    const toast = useToast();
    const [show, setShow] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const handleClick = () => setShow(!show)

    const updatePassword = async (formData: any) => {
        setSuccessMsg(null);
        setErrorMsg(null);
        setSubmitting(true);
        const { error } = await supabase.auth.updateUser({
            password: formData.password
        })
        if(!error) {
            toast({
                status: "success",
                title: "Password Updated",
                description: "For security reasons, you have been logged out! Please re-login with your new password",
                position: "top"
            })
        } else {
            setErrorMsg(error.message);
        }
    }

    return (
        <Box>
            <Heading mb={4}>Update Password</Heading>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                minWidth={'sm'}
                p={8}>
                <Formik
                    initialValues={{
                        password: '',
                        passwordConfirmation: '',
                    }}
                    validationSchema={UpdatePasswordSchema}
                    onSubmit={updatePassword}
                >
                    {({ isValid, dirty }) => (
                        <Form>
                            <Stack spacing={2}>
                                <Field name="password">
                                    {({ field, form }: any) => (
                                        <FormControl isRequired isInvalid={form.errors.password}>
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup size='md'>
                                                <Input
                                                    {...field}
                                                    pr='4.5rem'
                                                    type={show ? 'text' : 'password'}
                                                    placeholder='Enter password'
                                                />
                                                <InputRightElement width='4.5rem'>
                                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                                <Field name="passwordConfirmation">
                                    {({ field, form }: any) => (
                                        <FormControl isRequired isInvalid={form.errors.passwordConfirmation}>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <InputGroup size='md'>
                                                <Input
                                                    {...field}
                                                    pr='4.5rem'
                                                    type={show ? 'text' : 'password'}
                                                    placeholder='Confirm Password'
                                                />
                                                <InputRightElement width='4.5rem'>
                                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                                    {show ? 'Hide' : 'Show'}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{form.errors.passwordConfirmation}</FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>
                            </Stack>
                            <Stack spacing={10} pt={4}>
                                <Button
                                    type="submit"
                                    isLoading={submitting}
                                    isDisabled={!dirty || !isValid} 
                                    loadingText="Updating..."
                                    size="lg"
                                    colorScheme="pink">
                                    Change Password
                                </Button>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )   
}

export default UpdatePassword;