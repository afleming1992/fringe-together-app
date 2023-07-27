import { Box, Button, FormControl, FormLabel, Select, Text } from "@chakra-ui/react"
import { GroupShowInterestType, Show, } from "@/lib/gql/types"
import { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";


interface ShowInterestAndDateSelectorProps {
    show: Show,
    type: GroupShowInterestType | null,
    setType: (type: GroupShowInterestType) => void,
    updateInterest: (date?: Date) => void,
}

const DATE_DISPLAY_OPTIONS: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const ShowInterestAndDateSelector = ({show, type, setType, updateInterest}: ShowInterestAndDateSelectorProps) => {
    const [ submitting, setSubmitting ] = useState<boolean>(false);

    const onInterestedClicked = (formData: any) => {
        setType(GroupShowInterestType.INTERESTED);
    }

    const onGoingClicked = (formData: any) => {
        setType(GroupShowInterestType.BOOKED);
    }

    const onDateSelected = (formData: any) => {
        if(type) {
            setSubmitting(true);
            updateInterest(formData.date)
        }
    }
    
    return (
        <>
            {
                !type &&
                <Box mb={2} textAlign={"center"}>
                    <Text fontWeight={"bold"} mb={2}>Are you interested in this show or have you booked tickets already?</Text>
                    <Button onClick={onInterestedClicked} my={2} colorScheme="blue" size="lg" width="full">I&apos;m interested</Button>
                    <Button loadingText="Submitting" onClick={onGoingClicked} my={2} colorScheme="green" size="lg" width="full">I&apos;m going!</Button>
                </Box>
            }
            {
                type &&
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

