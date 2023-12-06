import React, {useEffect, useRef, useState} from "react";
import {BaseTemplate} from "../../../templates/BaseTemplate";
import {z} from "zod";
import {useForm, FieldValues, RegisterOptions} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import useSWR from "swr";
import {useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, UserCredential} from "firebase/auth";
import {Helmet} from "react-helmet-async";

import S from "../../settings";
import {appAuth} from "../../../AppRoutes";
import {delay} from "@app/utils";
import {api} from "@app/api";
import {useAuthStore} from "../store";
import {api_signin} from "@app/api";


export const EmailRegisterPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Register Account | {S.SITENAME}</title>
            </Helmet>
            <BaseTemplate>
                <h1>Register Account</h1>
                <RegisterForm />
                {/*<UsingSWR />*/}
                {/*<UsingUseEffect />*/}
            </BaseTemplate>
        </>
    )
}


const registerSchema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(6),
    confirm: z.string().min(6),
}).refine(data => data.confirm === data.password, {
    message: 'Passwords must match',
    path: ['confirm'],
});
type TRegisterSchema = z.infer<typeof registerSchema>;


export const RegisterForm: React.FC = () => {
    const authstore = useAuthStore();
    const navigate = useNavigate();
    const [formError, setFormError] = useState('')

    // Form
    const {register, handleSubmit, setError, setValue, formState: {errors, isSubmitting}} = useForm<TRegisterSchema>({
        resolver: zodResolver(registerSchema),
        // defaultValues: {
        //     email: 'jim@servehappy.ph',
        //     password: 'pass123',
        //     confirm: 'pass123',
        // }
    });

    const onSubmit = async (data: FieldValues) => {
        if(isSubmitting) return;
        setFormError('');
        await delay(2000);

        // Run code here
        createUserWithEmailAndPassword(appAuth, data['email'], data['password'])
            .then(res => {
                const user = res.user;
                return user.getIdToken();
            })
            .then(token => {
                authstore.login(token);
                console.log(token)
                return api_signin(token)
            })
            .then(res => {
                console.log(res?.data)
                navigate('/');
            })
            .catch(err => {
                if(err.code === 'auth/email-already-in-use') {
                    setError('email', {
                        message: 'Email already in use'
                    });
                }
                else {
                    setFormError("Can't register you right now. Try again in a few seconds.");
                }
                console.log(err)
                // setValue('pass1', '');
                // setValue('pass2', '');
            });
    }

    return (
        <>
            <Helmet>
                <title>{S.SITENAME}</title>
            </Helmet>
            <div className={'row mt-5'}>
                <div className="col col-md-7 col-lg-6 col-xl-4 mx-auto">
                    <div className="card">
                        <div className="card-body">

                            <div className="alert-list">
                                {formError && <div className="alert alert-danger">
                                    <i className="bi-exclamation-diamond"></i> {formError}
                                </div>}
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ul className={'form'}>
                                    <li>
                                        <label htmlFor="email">Email</label>
                                        <input {...register('email')} type="text" className="form-control" id={'email'} name={'email'}
                                               disabled={isSubmitting} />
                                        <div className="text-danger">{errors.email?.message}</div>
                                    </li>
                                    <li>
                                        <label htmlFor={'password'}>Password</label>
                                        <input {...register('password')} type="password" className="form-control" name={'password'}
                                               id="password" disabled={isSubmitting} />
                                        <div className="text-danger mb-2">{errors.password?.message}</div>
                                        <input {...register('confirm')} type="password" className="form-control"
                                               name={'confirm'} disabled={isSubmitting} placeholder={'Retype'} />
                                        <div className="text-danger">{errors.confirm?.message}</div>
                                    </li>
                                </ul>
                                <div className={'submit'}>
                                    <button className="btn btn-primary w-100" disabled={isSubmitting} type="submit">
                                        {isSubmitting ? 'Signing you up...' : 'Register'}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export const UsingSWR: React.FC = () => {
    const authstore = useAuthStore();
    const navigate = useNavigate();

    // Form
    const formschema = z.object({
        email: z.string().email().trim().toLowerCase(),
        pass1: z.string().min(6),
        pass2: z.string().min(6),
    });
    type FormSchema = z.infer<typeof formschema>;
    const {register, handleSubmit, reset, setError, formState: {errors, isSubmitting}} = useForm<FormSchema>({
        resolver: zodResolver(formschema),
        defaultValues: {
            pass1: 'pass123',
            pass2: 'pass123',
        }
    });

    // SWR: Just testing it. Actual form won't have this
    const fetcher = async () => {
        await delay(2000);
        const res = await api.get(`/users/4`);
        return res.data;
    }
    const {isLoading, error, data, mutate} = useSWR('xxx', fetcher);
    useEffect(() => reset(data), [data]);

    const onSubmit = async (data: FieldValues) => {
        if(isSubmitting) return;
        await delay(2000);

        // Run code here
        createUserWithEmailAndPassword(appAuth, data['email'], data['pass1'])
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
                if(err.code === 'auth/email-already-in-use') {
                    setError('email', {
                        message: 'Email already in use'
                    });
                }
                else {
                    setError('email', {
                        message: 'Try again in a few seconds'
                    });
                }
            });
    }

    // console.log(`[BUILDING]`);
    return (
        <>
            {error && (
                <div className="alert alert-danger">Something wrong here</div>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <ul className={'form'}>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input {...register('email')} type="text" className="form-control" id={'email'} name={'email'}
                               disabled={isSubmitting} placeholder={isLoading ? 'Loading...' : ''} />
                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </li>
                    <li>
                        <label htmlFor={'pass1'}>Password</label>
                        <input {...register('pass1')} type="password" className="form-control" name={'pass1'}
                               id="pass1" disabled={isSubmitting} />
                        {errors.pass1 && <div className="text-danger">{errors.pass1.message}</div>}
                        <input {...register('pass2')} type="password" className="form-control" name={'pass2'}
                               disabled={isSubmitting} placeholder={'Retype'} />
                        {errors.pass2 && <div className="text-danger">{errors.pass2.message}</div>}
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