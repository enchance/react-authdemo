import React, {useState} from "react";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {FieldValues, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from 'zod';

import {BaseTemplate} from "../../../templates/BaseTemplate";
import {appAuth} from "../../../AppRoutes";
import {useAuthStore} from "../store";
import {useNavigate} from "react-router-dom";



const signinSchema = z.object({
    email: z.string().min(6).trim().toLowerCase(),
    password: z.string().min(6),
});
type TSignInSchema = z.infer<typeof signinSchema>;

export const EmailLogininPage: React.FC = () => {
    const authstore = useAuthStore();
    const navigate = useNavigate();
    const [formError, setFormError] = useState('');

    const {register, handleSubmit, setError, formState: {errors, isSubmitting}} = useForm<TSignInSchema>({
        resolver: zodResolver(signinSchema),
        // defaultValues: {
        //     email: 'jim@servehappy.ph',
        //     password: 'pass123x'
        // }
    });

    const onSubmit = async (data: FieldValues) => {
        if(isSubmitting) return;
        setFormError('');

        await signInWithEmailAndPassword(appAuth, data['email'], data['password'])
            .then(res => {
                const user = res.user;
                return user.getIdToken();
            })
            .then(token => {
                authstore.login(token);
                // TODO: Send token to server
                navigate('/');
            })
            .catch(err => {
                if(err.code === 'auth/user-not-found') {
                    setError('email', {
                        message: 'Unknown account. Did you type it correctly?'
                    });
                }
                else {
                    setError('password', {
                        message: 'Make sure you type your password correctly.'
                    })
                    setFormError("Can't sign you in right now. Try again in a few seconds.");
                }
            })
    }

    return (
        <BaseTemplate>
            <div className="alert-list">
                {formError && <div className="alert alert-danger">
                    <i className="bi-exclamation-diamond"></i> {formError}
                </div>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="form">
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" {...register('email')} />
                        <div className="text-danger">{errors.email?.message}</div>
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" {...register('password')} />
                        <div className="text-danger">{errors.password?.message}</div>
                    </li>
                </ul>
                <div className="submit">
                    <button type="submit" className={'btn btn-primary w-100'} disabled={isSubmitting}>
                        {isSubmitting ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </form>
        </BaseTemplate>
    )
}