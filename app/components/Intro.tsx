import { Container, Box, Stack } from "@chakra-ui/react";

const Intro = () => {
    return (
        <>
            <h1 className="text-3xl font-bold md:text-4xl">
                Your Ultimate Group Companion for the Edinburgh Fringe!
            </h1>
            <Stack spacing={8} direction='row'>
                <Box maxW='sm'>
                    <h2 className="text-xl">Plan out</h2>
                    <p>Lorem ismfkjasklfjlksajklfjl</p>
                </Box >
                <Box maxW='sm'>
                    <h2 className="text-xl">Find Common Interests</h2>
                </Box>
                <Box maxW='sm'>
                    <h2 className="text-xl">Find Common Interests</h2>
                </Box>
            </Stack>
            <div className="flex justify-items-center">
                <button className="bg-pink-400 text-white p-2 rounded text-xl">Get Started</button>
            </div>
        </>
    );
}

export default Intro;