import { Show } from "@/lib/gql/types";
import { getShow } from "@/lib/gql/show";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Code, Divider, FormControl, FormErrorMessage, FormLabel, Input, Link, List, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

interface GetShowFormProps {
    setShow: any
}

const ticketsFringeRegex: RegExp = /^https:\/\/tickets\.edfringe\.com\/whats-on\/[a-zA-Z0-9-]+/;

const GetShowSchema = Yup.object().shape({
    url: Yup.string().required("A valid URL is required").matches(ticketsFringeRegex)
})

const GetShowForm = ({setShow}: GetShowFormProps) => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    async function onSubmit(formData: any) {
        setSubmitting(true);

        getShow(formData.url).then((show) => {
            setShow(show);
            setSubmitting(false);
            console.log(show);
        }).catch((error) => {
            console.error(error);
        })
    }

    return (
        <>
            <Box>
                <Text fontWeight={'bold'} size={'lg'}>Here is how to add a show...</Text>
                <Box mb={4}>
                    <OrderedList>
                        <ListItem p={1}>Head to the <Link color='pink.300' href="https://tickets.edfringe.com/" isExternal>tickets.edfringe.com <ExternalLinkIcon mx='2px' /></Link> page of the show you wish to add..</ListItem>
                        <ListItem p={1}>Copy the URL of the page. Is should look something like this: <Code>https://tickets.edfringe.com/whats-on/007-voices-of-bond</Code></ListItem>
                        <ListItem p={1}>Paste it into the form below and hit submit!</ListItem>
                    </OrderedList>
                </Box>
                <Divider />                
                <Formik
                    initialValues={{url: ''}}
                    onSubmit={onSubmit}
                    validationSchema={GetShowSchema}
                    >
                        {({ isValid, dirty }) => (
                            <Form>
                                <Box bg="gray-300" p={2}>
                                    <Field name='url'>
                                        {({ field, form }) => (
                                            <FormControl isInvalid={form.errors.url && form.touched.url}>
                                                <FormLabel>Show URL</FormLabel>
                                                <Input {...field} placeholder='https://tickets.edfringe.com/whats-on/...' />
                                                <FormErrorMessage>{form.errors.url}</FormErrorMessage>
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button type="submit" width={"full"} isDisabled={!dirty || !isValid} mt={4} variant='solid' colorScheme="green">
                                        Get Show
                                    </Button>
                                </Box>
                                
                            </Form>
                        )}
                </Formik>
            </Box>
        </>
    );
}

export default GetShowForm;