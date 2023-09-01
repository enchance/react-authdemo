import React from "react";
import {useForm, FieldValues} from "react-hook-form";
import {z} from 'zod';

import {Icons} from "../../helpers";
import {zodResolver} from "@hookform/resolvers/zod";



export const AuthOptionsPart: React.FC = () => {
    return (
        <>
            <h1>Auth Options Here</h1>
            <Icons icon={'bi-alarm'} />
        </>
    )
}