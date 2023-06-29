"use client";

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

import { Box, Container, Stack, Text, FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react";
import { create } from 'domain';

const CreateGroupSchema = Yup.object().shape({
    name: Yup.string().required("Required")
});

const CreateGroup = () => {

    async function createGroup(formData: any) {
    
    }

    return (
        <Container maxWidth={"lg"}>
            <Formik
                        initialValues={{ name: '' }}
                        onSubmit={createGroup}
                        validationSchema={CreateGroupSchema}
                    >
                    {({ errors, touched }) => (
                        <Form>
                            <Box rounded="md" bg="gray.700" p='6'>
                                <Stack direction={"column"}>
                                    <Text fontSize="2xl" fontWeight="700" mb={"4"}>
                                        Create a Group
                                    </Text>
                                    <Field name='name'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                                <FormLabel>Group Name</FormLabel>
                                                <Input {...field} placeholder='name' />
                                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                </Stack>
                                <Button isDisabled={!touched && errors != null} mt={4} colorScheme='pink'>
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
        </Container>
    )
}

export default CreateGroup;
