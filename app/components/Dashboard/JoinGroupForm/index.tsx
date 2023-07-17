import { Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputRightAddon, InputRightElement } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

interface JoinGroupFormProps {
    onJoinedGroup: () => void
}

const JoinGroupSchema = Yup.object().shape({
    joinCode: Yup.string().length(6, "Join Codes are Six Letters").required('Required')
})

export const JoinGroupForm = ({onJoinedGroup}: JoinGroupFormProps) => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const onSubmit = async(formData: any) => {
        setSubmitting(true);
    }

    return (
        <Formik
            initialValues={{joinCode: ''}}
            onSubmit={onSubmit}
            validationSchema={JoinGroupSchema}
        >
            {({ isValid, dirty }) => (
                <Form>
                    <Flex>
                        <Field name='joinCode'>
                            {({ field, form }: any) => (
                                <FormControl isInvalid={form.errors.joinCode && form.touched.joinCode} mr={4}>
                                    <Input {...field} placeholder='Join Code...' />
                                    <FormErrorMessage>{form.errors.joinCode}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button isLoading={submitting} type="submit" colorScheme="green" isDisabled={!dirty || !isValid} minWidth={24}>Join</Button>
                    </Flex>
                </Form>
            )}
        </Formik>

        
    );
}

