import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, useLocation, useNavigate, Router} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/App.css';
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, onIdTokenChanged} from "firebase/auth";
import {HelmetProvider} from 'react-helmet-async';


import S from "./app/settings";
import {ProtectedRoute} from "./app/helpers";
import {EmailRegisterPage} from "./app/auth/pages/EmailRegisterPage";
import {EmailSignInPage} from "./app/auth/pages/EmailSignInPage";
import {HomeUserPage, IndexPage} from "./pages/IndexPages";
import {LostPasswordPage} from "./app/auth/pages/LostPasswordPage";
import {useAuthStore} from "./app/auth/store";
import {Error404Page, ErrorBoundary} from "./app/pages/ErrorPages";
import {LogoutAction} from "./app/auth/pages/LogoutAction";
import {AuthOptionsPage} from "./app/auth/pages/AuthOptionsPage";
import {PrivatePage} from "./app/pages/Private";
import Auth from "./app/auth/Auth";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};
export const appRoutes = initializeApp(firebaseConfig);
export const appAuth = getAuth(appRoutes);
export const appProvider = new GoogleAuthProvider();


function AppRoutes() {
    const authstore = useAuthStore();

    useEffect(() => {
        // When page is refreshed
        const token = localStorage.getItem(S.keys.token) ?? '';
        if(!authstore.isAuth() && token && !Auth.isTokenExpired(token)) authstore.login(token);

        // When token is refreshed
        const authlistener = onIdTokenChanged(appAuth, (user) => {
            if(authstore.isAuth() && user) {
                user.getIdToken()
                    .then(token => authstore.changeToken(token))
                    .catch(_ => authstore.logout());
                return;
            }
            // authstore.logout();
        }, () => {
            console.log('onIdTokenChanged error');
            authstore.logout();
        });

        return (() => authlistener());
    }, []);

  return (
      <ErrorBoundary>
          <HelmetProvider>

              <BrowserRouter>
                  <Routes>props.children
                      <Route index element={<IndexPage />} />

                      {/* Guest only */}
                      <Route element={<ProtectedRoute enable={() => authstore.isAuth(false)} fallback={<HomeUserPage />} />}>
                          <Route path={S.paths.signin} element={<EmailSignInPage />} />
                          <Route path={S.paths.register} element={<EmailRegisterPage />} />
                          <Route path={S.paths.lostpass} element={<LostPasswordPage />} />
                      </Route>

                      {/* Auth only */}
                      <Route element={<ProtectedRoute enable={authstore.isAuth} fallback={<AuthOptionsPage />} />}>
                          <Route path={'/private'} element={<PrivatePage />} />
                          <Route path={S.paths.signout} element={<LogoutAction />} />
                      </Route>

                      <Route path={'*'} element={<Error404Page />} />
                  </Routes>
              </BrowserRouter>

          </HelmetProvider>
      </ErrorBoundary>
  );
}

export default AppRoutes;
