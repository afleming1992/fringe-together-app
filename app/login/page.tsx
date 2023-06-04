import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers'
import supabase from '../lib/supabase/server';


const Login = async () => {
    const handleLogin = async(formData: any) => {
        'use server'
        const email: string = formData.get('email');
        const password: string = formData.get('password');

        const supabase = createServerActionClient({ cookies });
        await supabase.auth.signInWithPassword({
            email,
            password
        })

        revalidatePath('/');
    }

    const { data } = await supabase.auth.getSession();

    if(data.session) {
        return <div>Logged in!</div>
    }

    return (
        <div className="flex items-center justify-center">
            <form className="w-full max-w-sm" action={handleLogin}>
                <h1 className="text-3xl font-bold text-center dark:text-white">Sign In</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">
                        Email
                    </label>
                    <input name="email" type="email" placeholder="Email" className="text-black"/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" placeholder="Password" className="text-black" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded mr-3">Login</button>
                    <a href="/" className="inline-block">Forgot Password?</a>
                </div>
            </form>
        </div>
        
    )
}

export default Login;