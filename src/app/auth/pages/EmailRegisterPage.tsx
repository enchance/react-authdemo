import React, {useEffect, useState} from "react";
import {BaseTemplate} from "../../../templates/BaseTemplate";
import {z} from "zod";
import {useForm, FieldValues} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import useSWR from "swr";

import S from "../../settings";
import {delay} from "../../utils";
import {api} from "../../api";


export const EmailRegisterPage: React.FC = () => {
    return (
        <BaseTemplate>
            <UsingSWR />
            {/*<UsingUseEffect />*/}
        </BaseTemplate>
    )
}



export const UsingSWR: React.FC = () => {
    const formschema = z.object({
        email: z.string().email().trim(),
        fullname: z.string().min(2).trim(),
        country: z.string().trim().min(2).max(2),
        // gender: z.string().max(10).trim(),
    });
    type FormSchema = z.infer<typeof formschema>;
    const {register, handleSubmit, reset, setError, formState: {errors, isSubmitting}} = useForm<FormSchema>({
        resolver: zodResolver(formschema),
    });

    const fetcher = async () => {
        await delay(2000);
        const res = await api.get(`/users/4`);
        return res.data;
    }

    // const id = Math.floor(Math.random() * 10);
    const {isLoading, error, data} = useSWR('xxx', fetcher);
    useEffect(() => reset(data), [data]);

    const onSubmit = async (data: FieldValues) => {
        if(isSubmitting) return;
        await delay(2000);
        console.log(data);
    }

    console.log(`[BUILDING]`);
    return (
        <>
            {error && (
                <div className="alert alert-danger">Something wrong here</div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul className={'form nopadding'}>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input {...register('email')} type="text" className="form-control" id={'email'} name={'email'}
                               disabled={isSubmitting} placeholder={isLoading ? 'Loading...' : ''} />
                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </li>
                    <li>
                        <label htmlFor={'fullname'}>Fullname</label>
                        <input {...register('fullname')} type="text" className="form-control" name={'fullname'}
                               id="fullname" disabled={isSubmitting} />
                        {errors.fullname && <div className="text-danger">{errors.fullname.message}</div>}
                    </li>
                    <li>
                        <label htmlFor={'country'}>Country</label>
                        <input {...register('country')} type="text" className="form-control" name={'country'}
                               id="country" disabled={isSubmitting} />
                        {errors.country && <div className="text-danger">{errors.country.message}</div>}
                    </li>
                </ul>
                <div className={'submit'}>
                    <button className="btn btn-primary w-100" disabled={isSubmitting} type="submit">
                        {isSubmitting ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            </form>
        </>
    )
}


export const UsingUseEffect: React.FC = () => {
    const [formdata, setFormdata] = useState({});
    const [fresh, setFresh] = useState(true)
    const formschema = z.object({
        email: z.string().email().trim(),
        fullname: z.string().min(2).trim(),
        country: z.string().trim().min(2).max(2),
    });
    type FormSchema = z.infer<typeof formschema>;
    const {register, handleSubmit, reset, setError, formState: {errors, isSubmitting}} = useForm<FormSchema>({
        resolver: zodResolver(formschema),
    });

    // Populate
    useEffect(() => {
        let id = Math.floor(Math.random() * 10);
        // id = id ? id : 1;
        id = 1;

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
                    <label htmlFor={'fullname'}>Fullname</label>
                    <input {...register('fullname')} type="text" className="form-control"
                           id="fullname" disabled={fresh || isSubmitting} />
                    {errors.fullname && <div className="text-danger">{errors.fullname.message}</div>}
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