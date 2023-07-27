
import { GroupShowInterestType, Show } from "@/lib/gql/types";
import { Link, Box, Button, ButtonGroup, Divider, FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import ShowPreviewCard from "./ShowPreviewCard";
import { InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik } from "formik";

interface GetShowConfirmationProps {
    show: Show,
    updateInterest: (showUri: string, type: GroupShowInterestType, date?: Date) => void,
    confirmNo: () => void
}

const DATE_DISPLAY_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const GetShowConfirmation = ({show, updateInterest, confirmNo}: GetShowConfirmationProps) => {
    const [ confirmed , setConfirmed ] = useState<boolean>(false);
    const [ type, setType ] = useState<GroupShowInterestType | null>(null);
    const [ submitting, setSubmitting ] = useState<boolean>(false);
    
    const [ going, setGoing ] = useState<boolean>(false);
    const [ interestedSubmitting, setInterestedSubmitting ] = useState<boolean>(false);
    const [ goingSubmitting, setGoingSubmitting ] = useState<boolean>(false);
    
    const onInterestedClicked = (formData: any) => {
        setType(GroupShowInterestType.INTERESTED);
    }

    const onGoingClicked = (formData: any) => {
        setType(GroupShowInterestType.BOOKED);
    }

    const onDateSelected = (formData: any) => {
        if(type) {
            setSubmitting(true);
            if(formData.date !== '') {
                updateInterest(show.uri, type, formData.date);
            } else {
                updateInterest(show.uri, type);
            }
        }
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
                confirmed && !type &&
                <Box mb={2} textAlign={"center"}>
                    <Text fontWeight={"bold"} mb={2}>Are you interested in this show or have you booked tickets already?</Text>
                    <Button isDisabled={goingSubmitting} isLoading={interestedSubmitting} loadingText="Submitting" onClick={onInterestedClicked} my={2} colorScheme="blue" size="lg" width="full">I&apos;m interested</Button>
                    <Button isDisabled={interestedSubmitting} isLoading={goingSubmitting} loadingText="Submitting" onClick={onGoingClicked} my={2} colorScheme="green" size="lg" width="full">I&apos;m going!</Button>
                </Box>
            }
            {   
                confirmed && type &&
                <Box mb={2} textAlign={"center"}>
                    <Formik
                        initialValues={{date: ""}}
                        onSubmit={onDateSelected}
                    >
                        {({ isValid, dirty }) => (
                            <Form>
                                <Text fontWeight={"bold"} mb={2}>{ type === GroupShowInterestType.BOOKED ? "Which date have you booked?" : "Are you interested in a particular date?"}</Text>
                                <Field>
                                    {({ field, form }: FieldProps) => (
                                        <FormControl my={2}>
                                            <FormLabel>Date Booked</FormLabel>
                                            <Select isDisabled={submitting} onChange={field.onChange} name="date">
                                                <option key="" value="">Don&apos;t select date</option>
                                                {
                                                    show.availableShows.map((availableShow) => {
                                                        const date = new Date(availableShow);
                
                                                        return (
                                                            <option key={availableShow} value={availableShow}>{ date.toLocaleDateString(undefined, DATE_DISPLAY_OPTIONS) }</option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    )}
                                </Field>
                                <Button type="submit" isLoading={submitting} loadingText="Submitting" colorScheme="green" width="full">Submit</Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            }
        </>
    )
}

export default GetShowConfirmation;