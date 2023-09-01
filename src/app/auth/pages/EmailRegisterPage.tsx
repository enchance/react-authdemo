import React from "react";
import {BaseTemplate} from "../../../templates/BaseTemplate";
import {z} from "zod";
import {useForm, FieldValues} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


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
        </BaseTemplate>
    )
}