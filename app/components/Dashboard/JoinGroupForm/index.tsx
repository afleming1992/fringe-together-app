import { joinGroup } from "@/lib/gql/group";
import { Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputRightAddon, InputRightElement, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const toast = useToast();

    const onSubmit = async(formData: any) => {
        setSubmitting(true);
        try {
            const upperCaseJoinCode = formData.joinCode.toUpperCase()
            const group = await joinGroup(upperCaseJoinCode);
            if(group) {
                router.push(`/group/${group.id}`)
            }
        } catch (e: any) {
            toast({
                status: "error",
                title: "Couldn't join new group",
                description: "Either the Group doesn't exist or is closed to new members",
                position: 'top'
            })
        }
        setSubmitting(false);
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

