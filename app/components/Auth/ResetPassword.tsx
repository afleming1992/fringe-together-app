import { useState } from "react";
import { VIEWS, useAuth } from "../AuthProvider";
import supabase from "@/lib/supabase/browser";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import cn from 'classnames';

const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required('Required')
})

const ResetPassword = () => {
    const { setView } = useAuth();
    const [ errorMsg, setErrorMsg ] = useState<string | null>(null);
    const [ successMsg, setSuccessMsg ] = useState<string | null>(null);

    async function resetPassword(formData: any) {
        console.log(formData);
        const { error } = await supabase.auth.resetPasswordForEmail(formData?.email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_BASE_URL}`
        });

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('Password reset instructions sent.')
        }
    }

    return (
        <div className="flex items-center justify-center">
            
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={ResetPasswordSchema}
                onSubmit={resetPassword}
            >
                {({ errors, touched }) => (
                    <Form className='w-full max-w-sm'>
                        <h2 className="text-3xl font-bold w-full text-center mb-4 dark:text-white">Forgot Password</h2>
                        {errorMsg && <div className="text-red-600 text-center">{errorMsg}</div>}
                        {successMsg && <div className="text-green-600 text-center">{successMsg}</div>}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
                            <Field
                                className={cn('input','w-full','text-black', errors.email && 'bg-red-50')}
                                id="email"
                                name="email"
                                placeholder="jane@acme.com"
                                type="email"
                                />
                                {errors.email && touched.email ? (
                                    <div className="text-red-600">{errors.email}</div>
                                ) : null}
                        </div>
                        <div className="flex justify-items justify-between mb-4">
                            <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded mr-3">Submit</button>
                            <button className="link w-full" type="button" onClick={() => setView(VIEWS.SIGN_UP)}>
                                Don&apos;t have an account? Sign Up.
                            </button>
                        </div>
                        
                    </Form>
                )}
            </Formik>
            
        </div>
    );
}

export default ResetPassword