'use client';

import { useState } from 'react';
import cn from 'classnames';

import { useAuth, VIEWS } from '../AuthProvider';
import supabase from '@/lib/supabase/browser';

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Button, Heading, Text } from '@chakra-ui/react';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
});

const SignIn = () => {
    const { setView } = useAuth();
    const [ errorMsg, setErrorMsg ] = useState<string | null>(null);

    async function signIn(formData: any) {
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if(error) {
            setErrorMsg(error.message);
        }

        setView(null);
    }

    return (
        <div className="flex items-center justify-center">
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignInSchema}
                onSubmit={signIn}
            >
                {({ errors, touched }) => (
                    <Form className="w-full max-w-sm">
                        <Heading as={"h1"} mb="1">Sign In</Heading>
                        <Text>Not currently a member? <Button variant='link' onClick={() => setView(VIEWS.SIGN_UP)}>Sign Up Here</Button></Text>
                        {errorMsg && <div className="text-red-600 w-full text-center">{errorMsg}</div>}
                        <div className="mt-4 mb-4">
                            <label htmlFor="email" className="block text-sm font-bold mb-2">
                                Email
                            </label>
                            <Field 
                                className={cn('input','w-full','text-black', errors.email && touched.email && 'bg-red-50')}
                                id="email"
                                name="email"
                                placeholder="jane@acme.com"
                                type="email" />
                            {errors.email && touched.email ? (
                                <div className="text-red-600">{errors.email}</div>
                            ) : null}
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <Field
                                className={cn('input','w-full','text-black', errors.password && touched.password && 'bg-red-50')}
                                id="password"
                                name="password"
                                type="password"
                                />
                            {errors.password && touched.password ? (
                                <div className="text-red-600">{errors.password}</div>
                            ) : null}
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded mr-3">Login</button>
                            <button className="link" onClick={() => setView(VIEWS.FORGOTTEN_PASSWORD)}>Forgot Password?</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default SignIn;
