import { ReactNode } from "react"
import { GroupProvider } from "../context/group"
import AuthWrapper from "@/app/components/Auth/AuthWrapper"
import ContainerWrapper from "@/app/components/ContainerWrapper"
import GroupPageWrapper from "./components/GroupPageWrapper"

export interface GroupLayoutProps {
    children: ReactNode,
    groupId: string
}

const GroupLayout = async ({children, groupId}: GroupLayoutProps) => {
    return (
        <AuthWrapper required={true}>
            <ContainerWrapper width="6xl">
                <GroupProvider groupId={parseInt(groupId)}> 
                    <GroupPageWrapper>
                        {children}
                    </GroupPageWrapper>
                </GroupProvider>
            </ContainerWrapper>
        </AuthWrapper>
    )
}

export default GroupLayout;