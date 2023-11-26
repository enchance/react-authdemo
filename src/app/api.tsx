import axios from "axios";
import S from "./settings";



export const api = axios.create({
    withCredentials: true,
    baseURL: S.SITEURL,
});


export const api_signin = async (token: string) => {
    return await api.post('/auth/signin', token)
}