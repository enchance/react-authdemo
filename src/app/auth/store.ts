import {create} from "zustand";
import {NavigateFunction} from "react-router/dist/lib/hooks";

import S from "../settings";


interface IAuthStore {
    name: string,
    isAuth: (authOnly?: boolean) => boolean;
    token: string;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthStore>()((set, get) => ({
    name: 'foofoo',
    isAuth: (authOnly: boolean = true) => {
        if(authOnly) return get().token !== '';
        return get().token === '';
    },
    token: '',
    login: (token: string) => {
        localStorage.setItem(S.keys.token, token);
        set(_ => ({token: token}));
    },
    logout: () => {
        localStorage.removeItem(S.keys.token);
        set(_ => ({token: ''}));
    },
}));