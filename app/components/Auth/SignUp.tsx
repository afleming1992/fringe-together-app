'use client';

import { useState } from 'react';
import cn from 'classnames';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { useAuth, VIEWS } from '../AuthProvider';
import supabase from '../../lib/supabase/browser';
import { AuthResponse } from '@supabase/supabase-js';
import { useMutation, useQuery } from '@apollo/client';
import { createUser } from '@/app/lib/gql/user';
import apolloClient from '@/app/lib/apollo/client';

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignUp = () => {
    const { setView } = useAuth();
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    async function signUp(formData: any) {
        setSuccessMsg('');
        setErrorMsg('');

        const authResponse: AuthResponse = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    first_name: formData.firstName,
                    last_name: formData.lastName
                }
            }
        });

        if (authResponse.error) {
            setErrorMsg(authResponse.error.message);
            return;
        }
        
        try {
            const { errors } = await apolloClient.mutate({
                mutation: createUser,
                variables: {
                    uid: authResponse.data.user?.id,
                    first_name: formData.firstName,
                    last_name: formData.lastName
                }
            });

            if (errors) {
                setErrorMsg(errors[0].message);
            } else {
                setSuccessMsg('Success! Please check your email for further instructions.');
            }
        } catch (e) {
            console.error(e);
        };
        
        
    }

    return (
        <div className="flex items-center justify-center">
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: ''
                }}
                validationSchema={SignUpSchema}
                onSubmit={signUp}
            >
                {({ errors, touched }) => (
                    <Form className={cn('w-full', 'max-w-sm')}>
                        <h1 className="text-3xl font-bold text-center mb-4 dark:text-white">Sign In</h1>
                        {successMsg && <div className="text-green-600 w-full text-center">{successMsg}</div>}
                        {errorMsg && <div className="text-red-600 w-full text-center">{errorMsg}</div>}
                        <div className={cn(successMsg && 'hidden')}>
                            <div className="mb-4">
                                <label htmlFor="firstName" className="block text-sm font-bold mb-2">
                                    First Name
                                </label>
                                <Field 
                                    className={cn('input','w-full','text-black', errors.firstName && touched.firstName && 'bg-red-50')}
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Jane"
                                    type="text" />
                                {errors.firstName && touched.firstName ? (
                                    <div className="text-red-600">{errors.firstName}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="lastName" className="block text-sm font-bold mb-2">
                                    Last Name
                                </label>
                                <Field 
                                    className={cn('input','w-full','text-black', errors.lastName && touched.lastName && 'bg-red-50')}
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    type="text" />
                                {errors.lastName && touched.lastName ? (
                                    <div className="text-red-600">{errors.lastName}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
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
                                <button type="submit" className="bg-pink-400 hover:bg-pink-500 text-white p-2 rounded mr-3">Sign Up</button>
                                <button className="link" onClick={() => setView(VIEWS.SIGN_IN)}>Already have an account? Sign In</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUp;