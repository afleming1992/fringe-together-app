import { useState } from "react";
import { VIEWS, useAuth } from "../AuthProvider";
import supabase from "@/lib/supabase/browser";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import cn from 'classnames';
import { Box,Flex, Stack, Heading, Text, useColorModeValue, Alert, AlertDescription, AlertIcon, AlertTitle, FormControl, FormErrorMessage, FormLabel, Input, Button } from '@chakra-ui/react';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required('Required')
})

const ResetPassword = () => {
    const { setView } = useAuth();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [hideForm, setHideForm] = useState<boolean>(false);

    async function resetPassword(formData: any) {
        setSubmitting(true);
        console.log(formData);
        const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
            redirectTo: `${location.origin}/auth/callback?next=/account/update-password`
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setHideForm(true);
            setSuccessMsg(`If you hold an account with us, we have sent instructions to reset your password!`)
        }
        setSubmitting(false);
    }

    return (
        <Flex
            minH="20vh"
            align="center"
            justify="center">
            <Stack spacing={8} mx={"auto"} maxW={'lg'} py={12} px={6}>
                <Stack align="center">
                    <Heading size="lg" textAlign="center">Forgot your password?</Heading>
                    <Text fontSize={'lg'} color={'pink.200'}>
                        You&apos;ll get an email with a reset link
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    minWidth={'sm'}
                    p={8}>
                    {
                        errorMsg && 
                        <Alert status='error' variant='left-accent' mb={2}>
                            <AlertIcon />
                            {errorMsg}
                        </Alert>
                    }
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
                                { successMsg }
                            </AlertDescription>
                        </Alert>
                    }
                    { !hideForm &&
                        <Formik
                            initialValues={{
                                email: '',
                            }}
                            validationSchema={ResetPasswordSchema}
                            onSubmit={resetPassword}
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
                                    </Stack>
                                    <Stack spacing={10} pt={4}>
                                        <Button
                                            type="submit"
                                            isLoading={submitting}
                                            isDisabled={!dirty || !isValid} 
                                            loadingText="Requesting..."
                                            size="lg"
                                            colorScheme="pink">
                                            Request Reset
                                        </Button>
                                    </Stack>
                                </Form>
                            )}
                        </Formik>
                     }
                </Box>
            </Stack>
            
            
        </Flex>
    );
}

export default ResetPassword