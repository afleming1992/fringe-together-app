import { Box, Button, Text } from '@chakra-ui/react';

interface GetShowConfirmationProps {
    yes: () => void,
    no: () => void
}

const GetShowConfirmation = ({yes, no}: GetShowConfirmationProps) => {
    return (
        <>
            <Box mb={2} textAlign={"center"}>
                <Text fontWeight={"bold"}>Is this the correct show?</Text>
                <Button onClick={() => yes()} my={2} width="full" colorScheme="green" variant="solid">
                    Yes
                </Button>
                <Button onClick={() => no()} my={2} width="full" colorScheme="red" variant="solid">
                    No
                </Button>
            </Box>
        </>
    )
}

export default GetShowConfirmation;