import { ReactNode } from "react"
import { GroupProvider } from "../context/group"
import AuthWrapper from "@/app/components/Auth/AuthWrapper"
import ContainerWrapper from "@/app/components/ContainerWrapper"
import GroupHeader from "./components/GroupHeader"

interface GroupLayoutProps {
    children: ReactNode,
    params: GroupLayoutProps
}

interface GroupLayoutProps {
    groupid: string
}

const GroupLayout = async ({children, params}: GroupLayoutProps) => {
    return (
        <AuthWrapper required={true}>
            <ContainerWrapper width="6xl">
                <GroupProvider groupId={parseInt(params.groupid)}> 
                    <GroupHeader />
                    {children}
                </GroupProvider>
            </ContainerWrapper>
        </AuthWrapper>
    )
}

export default GroupLayout;