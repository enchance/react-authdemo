import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/App.css';
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, onAuthStateChanged} from "firebase/auth";


import S from "./app/settings";
import {ProtectedRoute} from "./app/helpers";
import {EmailRegisterPage} from "./app/auth/pages/EmailRegisterPage";
import {EmailLogininPage} from "./app/auth/pages/EmailLogininPage";
import {HomeUserPage, IndexPage} from "./pages/IndexPages";
import {LostPasswordPage} from "./app/auth/pages/LostPasswordPage";
import {useAuthStore} from "./app/auth/store";
import {Error404Page} from "./app/pages/ErrorPages";
import {LogoutAction} from "./app/auth/pages/LogoutAction";
import {AuthOptionsPage} from "./app/auth/pages/AuthOptionsPage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};
export const app = initializeApp(firebaseConfig);
export const appAuth = getAuth(app);
export const appProvider = new GoogleAuthProvider();


function AppRoutes() {
    const [isAuth, logout, login] = useAuthStore(state => [state.isAuth, state.logout, state.login]);

    // useEffect(() => {
    //     const authlistener = onAuthStateChanged(appAuth, (user) => {
    //         // TODO: Ensuring authentication:
    //         //  Save token to localstorage
    //         //  ORDER: store -> localstorage -> [user]-> logout()
    //         //  if empty localstorage && !store: logout()
    //         //  if empty localstorage && store: update to localstorage
    //         //  if localstorage is fresh && !store: login()
    //         //  if !localstorage && !store && user: then do nothing
    //         console.log('USER:', user);
    //         if(isAuth() && !user) logout();
    //         logout();
    //     });
    //
    //     return (() => authlistener());
    // }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<IndexPage />} />

          <Route element={<ProtectedRoute enable={() => isAuth(false)} fallback={<HomeUserPage />} />}>
              <Route path={S.paths.register} element={<EmailRegisterPage />} />
              <Route path={S.paths.signin} element={<EmailLogininPage />} />
              <Route path={S.paths.lostpass} element={<LostPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute enable={isAuth} fallback={<AuthOptionsPage />} />}>
              <Route path={S.paths.signout} element={<LogoutAction />} />
          </Route>

          <Route path={'*'} element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
