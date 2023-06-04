'use client';

import { useAuth, VIEWS } from '../AuthProvider';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface AuthProps {
    view: {
        initialView: string | undefined
    }
}

const Auth = ({view: initialView}: AuthProps) => {
    let { view } = useAuth();

    if ( initialView ) {
        view = initialView;
    }

    switch(view) {
        case VIEWS.LOADING:
            return <div>Loading...</div>
        case VIEWS.UPDATE_PASSWORD:
            return <>Update Password</>
        case VIEWS.FORGOTTEN_PASSWORD:
            return <></>
        case VIEWS.SIGN_UP:
            return <SignUp />
        default:
            return <SignIn />
    }
}

export default Auth;