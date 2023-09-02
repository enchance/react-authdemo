import React from "react";
import {useForm, FieldValues} from "react-hook-form";
import {z} from 'zod';

import {Icons} from "../../helpers";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthStore} from "../store";



export const AuthOptionsPart: React.FC = () => {
    const isAuth = useAuthStore(state => state.isAuth);

    return (
        <>
            <h1>Auth Options Here</h1>
            <h2>{isAuth()}</h2>
            <Icons icon={'bi-alarm'} />
        </>
    )
}