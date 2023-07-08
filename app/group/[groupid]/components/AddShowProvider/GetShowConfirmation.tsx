
import { Show } from "@/lib/gql/types";
import { Link, Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import ShowPreviewCard from "./ShowPreviewCard";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik } from "formik";

interface GetShowConfirmationProps {
    show: Show,
    confirmInterested: (date?: Date) => void,
    confirmBooked: (date: Date) => void,
    confirmNo: () => void
}

const AlreadyBookedSchema = Yup.object().shape({
    date: Yup.string().required("A Date is required")
})

const GetShowConfirmation = ({show, confirmInterested, confirmBooked, confirmNo}: GetShowConfirmationProps) => {
    const [ confirmed , setConfirmed ] = useState<boolean>(false);
    const [ alreadyBooked, setAlreadyBooked ] = useState<boolean>(false);
    const [ interestedSubmitting, setInterestedSubmitting ] = useState<boolean>(false);
    const [ alreadyBookedSubmitting, setAlreadyBookedSubmitting ] = useState<boolean>(false);
    
    const onInterestedClick = (formData: any) => {
        setInterestedSubmitting(true);
        confirmInterested();
    }

    const onAlreadyBookedSubmit = (formData: any) => {
        setAlreadyBookedSubmitting(true);
        confirmBooked(new Date(formData.date))
    }

    return (
        <>
            <ShowPreviewCard showDescription={true} showCta={true} show={show} />
            <Divider my={2} />
            {
                !confirmed &&
                <Box mb={2} textAlign={"center"}>
                    <Text fontWeight={"bold"}>Is this the correct show?</Text>
                    <Button onClick={() => setConfirmed(true)} my={2} width="full" colorScheme="green" variant="solid">
                        Yes
                    </Button>
                    <Button onClick={confirmNo} my={2} width="full" colorScheme="red" variant="solid">
                        No
                    </Button>
                </Box>
            }
            {
                confirmed && !alreadyBooked &&
                <Box mb={2} textAlign={"center"}>
                    <Text fontWeight={"bold"} mb={2}>Are you interested in this show or have you booked tickets already?</Text>
                    <Button isLoading={interestedSubmitting} loadingText="Submitting" onClick={onInterestedClick} my={2} colorScheme="blue" size="lg" width="full">I&apos;m interested</Button>
                    {/*
                        <Button isDisabled={interestedSubmitting} onClick={() => {setAlreadyBooked(true)}} my={2} colorScheme="green" size="lg" width="full">I&apos;ve already booked tickets!</Button>
                    */}
                </Box>
            }
            {
                confirmed && alreadyBooked &&
                <Box mb={2} textAlign={"center"}>
                    <Formik
                        initialValues={{date: ""}}
                        onSubmit={onAlreadyBookedSubmit}
                        validationSchema={AlreadyBookedSchema}
                    >
                        {({ isValid, dirty }) => (
                            <Form>
                                <Text fontWeight={"bold"} mb={2}>Awesome! Which showing did you book? That way we can show this to your friends!</Text>
                                <Field>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl my={2}>
                                            <FormLabel>Date Booked</FormLabel>
                                            <Select isDisabled={alreadyBookedSubmitting} onChange={field.onChange} name="date" placeholder="Select showing">
                                                {
                                                    show.availableShows.map((availableShow) => {
                                                        const date = new Date(availableShow);
                
                                                        return (
                                                            <option key={availableShow} value={availableShow}>{ date.toUTCString() }</option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button isDisabled={!dirty || !isValid} type="submit" isLoading={alreadyBookedSubmitting} loadingText="Submitting" colorScheme="green" width="full">Submit</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            }
        </>
    )
}

export default GetShowConfirmation;