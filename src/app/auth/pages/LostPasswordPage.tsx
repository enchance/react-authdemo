import React, {useState} from "react";
import  {sendPasswordResetEmail} from 'firebase/auth';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";

import {BaseTemplate} from "../../../templates/BaseTemplate";
import {FieldValues, useForm} from "react-hook-form";
import {appAuth} from "../../../AppRoutes";



const lostPasswordSchema = z.object({
    email: z.string().email().trim().toLowerCase(),
});
type TLostPasswordSchema = z.infer<typeof lostPasswordSchema>;

export const LostPasswordPage: React.FC = () => {
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('')

    const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm<TLostPasswordSchema>({
        resolver: zodResolver(lostPasswordSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        if(isSubmitting) return;
        setFormError('');
        setFormSuccess('');

        try {
            await sendPasswordResetEmail(appAuth, data['email']);
            setFormSuccess('Check your email for your reset link.');
            reset({
                email: ''
            })
        }
        catch(err) {
            console.log(err);
            setFormError('Unknown account. Did you type it correctly?');
        }
    }

    return (
        <BaseTemplate>
            <div className="alert-list">
                {formError && <div className="alert alert-danger">
                    <i className="bi-exclamation-diamond"></i> {formError}
                </div>}
                {formSuccess && <div className="alert alert-success">
                    <i className="bi-check-lg"></i> {formSuccess}
                </div>}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul className="form">
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" {...register('email')} />
                        <div className="text-danger">{errors.email?.message}</div>
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