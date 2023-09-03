import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {GoogleAuthProvider, signInWithPopup, ParsedToken} from "firebase/auth";
import jwt_decode from 'jwt-decode';

import S from "../../settings";
import {Icons} from "../../helpers";
import {useAuthStore} from "../store";
import {appAuth, appProvider} from "../../../AppRoutes";
import Auth from "../Auth";



export const AuthOptionsPart: React.FC = () => {
    const authstore = useAuthStore();
    const navigate = useNavigate();

    const googleHandler = () => {
        signInWithPopup(appAuth, appProvider)
            .then(res => {
                // const credential = GoogleAuthProvider.credentialFromResult(res);
                // console.log('TOKEN1:', credential!.accessToken!);
                const user = res.user;
                return user.getIdToken();
            })
            .then(token => {
                if(token ?? true) return;
                if(Auth.isTokenExpired(token)) return;

                authstore.login(token!);
                navigate('/');
            })
            .catch(err => {
                console.log(err)
                const credential = GoogleAuthProvider.credentialFromError(err);
                console.log(credential);
            })
    }

    return (
        <div className={'row mt-5 bg-xxx'}>
            <div className="col col-md-7 col-lg-6 col-xl-4 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Login</h1>
                        <ul className={'form nopadding'}>
                            <li>
                                <button className="btn btn-primary btn-danger w-100" onClick={googleHandler}>
                                    <Icons icon={'bi bi-google me-2'} color={'#FFF'} />
                                    <strong>Google Sign-in</strong>
                                </button>
                            </li>
                            <li>
                                <Link className="btn btn-gray w-100" to={S.paths.signin}>
                                    <Icons icon={'bi bi-envelope-fill me-2'} color={'#333'} />
                                    <strong>Email Sign-in</strong>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
