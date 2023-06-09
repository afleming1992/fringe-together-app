import { useAuth } from "../AuthProvider";
import Auth from ".";
import Card from "../Card";

interface AuthRequiredWrapper {
    children: any
}

const AuthRequiredWrapper = ({children}: AuthRequiredWrapper) => {
    const { initial, user, view, signOut } = useAuth();

    if (initial) {
        return <div className="mx-auto max-w-md">
            <Card>Loading...</Card>
        </div>
    }

    if (!user) {
        return <Auth view={view} />
    } else {
        return <>
            {children}
        </>
    }
}

export default AuthRequiredWrapper;