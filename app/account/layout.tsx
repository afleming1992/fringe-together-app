import { ReactNode } from "react"
import AuthWrapper from "../components/Auth/AuthWrapper"
import ContainerWrapper from "../components/ContainerWrapper"

export interface AccountLayoutProps {
    children: ReactNode
}

const AccountLayout = async ({children} : AccountLayoutProps) => {
    return (
        <AuthWrapper required={true}>
            <ContainerWrapper width="6xl">
                { children }
            </ContainerWrapper>
        </AuthWrapper>
    )
}

export default AccountLayout;