import React, {useEffect, useState} from "react";
import {BaseTemplate} from "../../../templates/BaseTemplate";
import {z} from "zod";
import {useForm, FieldValues} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FieldErrors} from "react-hook-form/dist/types/errors";

import {delay} from "../../utils";
import {api} from "../../helpers";


export const EmailRegisterPage: React.FC = () => {
    const initval = {
        email: '',
        password1: '',
        password2: '',
    }
    const formschema = z.object({
        email: z.string().email(),
        password1: z.string().min(6),
        password2: z.string().min(6),
    });
    type TFormSchema = z.infer<typeof formschema>;
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<TFormSchema>({
        defaultValues: initval,
        resolver: zodResolver(formschema),
    });

    return (
        <BaseTemplate>
            <Aaa />
            {/*
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h1>Email Register</h1>
                    </div>
                    <div className="card-text">
                        <form>
                            <ul className={'form nopadding'}>
                                <li>
                                    <label htmlFor="email">Email</label>
                                    <input {...register('email')} type="text" className="form-control" id={'email'} />
                                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                </li>
                                <li>
                                    <label htmlFor="password1">Password</label>
                                    <input {...register('password1')} type="password" className="form-control" id={'password1'} />
                                    {errors.password1 && <div className="text-danger">{errors.password1.message}</div>}
                                    <div style={{marginBottom: '5px',}}></div>
                                    <input {...register('password2')} type="password" className="form-control" id={'password2'}
                                           placeholder={'Retype'} />
                                    {errors.password2 && <div className="text-danger">{errors.password2.message}</div>}
                                </li>
                            </ul>
                            <div className={'submit'}>
                                <input className={'btn btn-primary w-100'} type="submit" value={'Submit'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            */}
        </BaseTemplate>
    )
}


export const Aaa: React.FC = () => {
    const [formdata, setFormdata] = useState({});
    const [fresh, setFresh] = useState(true)
    const formschema = z.object({
        email: z.string().email().trim(),
        country: z.string().min(5).trim(),
        gender: z.string().max(10).trim(),
    });
    type FormSchema = z.infer<typeof formschema>;
    const {register, handleSubmit, reset, setError, formState: {errors, isSubmitting}} = useForm<FormSchema>({
        resolver: zodResolver(formschema),
    });

    // Populate
    useEffect(() => {
        const id = Math.floor(Math.random() * 10);
        // id = id ? id : 1;

        delay(1000).then(_ => {
            console.log(id);
            return api.get(`/users/${id}`);
        }).then(response => {
            setFormdata({...response.data});
            setFresh(false);
            console.log(response.data);
        }).catch(err => {
            console.log(err);
            setFormdata({})
        })
    }, []);

    useEffect(() => {
        reset(formdata);
    }, [formdata]);

    const onSubmit = async (data: FieldValues) => {
        if(fresh || isSubmitting) return;
        // Submit here
        await delay(2000);
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <ul className={'form nopadding'}>
                <li>
                    <label htmlFor="email">Email</label>
                    <input {...register('email')} type="text" className="form-control" id={'email'}
                           disabled={fresh || isSubmitting} placeholder={fresh ? 'Loading...' : ''} />
                    {errors.email && <div className="text-danger">{errors.email.message}</div>}
                </li>
                <li>
                    <label htmlFor={'country'}>Country</label>
                    <input {...register('country')} type="text" className="form-control"
                           id="country" disabled={fresh || isSubmitting} />
                    {errors.country && <div className="text-danger">{errors.country.message}</div>}
                </li>
            </ul>
            <div className={'submit'}>
                <button className="btn btn-primary w-100" disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Loading...' : 'Submit'}
                </button>
            </div>
        </form>
    )
}