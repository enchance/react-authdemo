import React from "react";
import {Link} from "react-router-dom";

import S from "../../settings";
import {Icons} from "../../helpers";
import {useAuthStore} from "../store";



export const AuthOptionsPart: React.FC = () => {
    const isAuth = useAuthStore(state => state.isAuth);

    return (
        <div className={'row mt-5 bg-xxx'}>
            <div className="col col-md-7 col-lg-6 col-xl-4 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <h1 className="card-title">Login</h1>
                        <ul className={'form nopadding'}>
                            <li><button className="btn btn-primary btn-danger w-100">
                                <Icons icon={'bi bi-google me-2'} color={'#FFF'} />
                                <strong>Google Sign-in</strong>
                            </button></li>
                            <li><Link className="btn btn-gray w-100" to={S.path.signin}>
                                <Icons icon={'bi bi-envelope-fill me-2'} color={'#333'} />
                                <strong>Email Sign-in</strong>
                            </Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
