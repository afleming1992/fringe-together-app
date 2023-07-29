import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, Code, Divider, FormControl, FormErrorMessage, FormLabel, Input, Link, ListItem, OrderedList, Text } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';

interface GetShowFormProps {
    setShowUri: (showUri: string) => void,
}

const ticketsFringeRegex: RegExp = /^https:\/\/tickets\.edfringe\.com\/whats-on\/[a-zA-Z0-9-]+/;

const GetShowSchema = Yup.object().shape({
    url: Yup.string().required("A valid URL is required").matches(ticketsFringeRegex)
})

const GetShowForm = ({setShowUri}: GetShowFormProps) => {
    async function onSubmit(formData: any) {
        setShowUri(formData.url)
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
                                        {({ field, form }: any) => (
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