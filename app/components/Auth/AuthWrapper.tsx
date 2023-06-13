import { useAuth } from "../AuthProvider";
import Auth from ".";
import Card from "../Card";
import { Box } from "@chakra-ui/react";

interface AuthRequiredWrapper {
    required: boolean,
    children: any
}

const AuthWrapper = ({children, required}: AuthRequiredWrapper) => {
    const { initial, user, view, signOut } = useAuth();

    if (initial) {
        return <div className="mx-auto max-w-md">
            <Box>Loading...</Box>
        </div>
    }

    if (!user && required || view != null) {
        return <Auth view={view} />
    } else {
        return <>
            {children}
        </>
    }
}

export default AuthWrapper;