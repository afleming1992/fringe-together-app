import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../lib/supabase";


const Login = () => {
    

    return (
        <>
            <Auth supabaseClient={supabase} />
        </>
    )
}

export default Login;