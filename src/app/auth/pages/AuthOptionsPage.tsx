import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {GoogleAuthProvider, signInWithPopup, ParsedToken} from "firebase/auth";
import {Helmet} from 'react-helmet-async';

import S from "../../settings";
import {Icons} from "../../helpers";
import {useAuthStore} from "../store";
import {appAuth, appProvider} from "../../../AppRoutes";
import Auth from "../Auth";
import {BaseTemplate} from "../../../templates/BaseTemplate";
import {api_signin} from "../../api";



export const AuthOptionsPage: React.FC = () => {
    const authstore = useAuthStore();
    const navigate = useNavigate();

    const googleHandler = () => {
        signInWithPopup(appAuth, appProvider)
            .then(res => {
                // const credential = GoogleAuthProvider.credentialFromResult(res);
                // console.log('TOKEN1:', credential!.accessToken!);
                // console.log(res);
                const user = res.user;
                return user.getIdToken();
            })
            .then(token => {
                if(token === '') return;
                if(Auth.isTokenExpired(token)) return;

                authstore.login(token!);
                return api_signin(token)
            })
            .then(res => {
                console.log(res?.data)
                navigate('/');
            })
            .catch(err => {
                // const credential = GoogleAuthProvider.credentialFromError(err);
                // console.log(credential);
            })
    }

    return (
        <>
            <Helmet>
                <title>{S.SITENAME}</title>
            </Helmet>
            <BaseTemplate>
                <div className={'row mt-5'}>
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
            </BaseTemplate>
        </>
    )
}
