import axios from "axios";
import S from "./settings";



export const api = axios.create({
    withCredentials: true,
    baseURL: S.SITEURL,
});