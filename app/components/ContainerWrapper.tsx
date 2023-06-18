"use client";

import { Container } from "@chakra-ui/react";

interface ContainerWrapperProps {
    width: string
    children: any
}

const ContainerWrapper = ({children, width}: ContainerWrapperProps) => {
    return (
        <Container maxWidth={width}>
            {children}
        </Container>
    )
}
    
export default ContainerWrapper;