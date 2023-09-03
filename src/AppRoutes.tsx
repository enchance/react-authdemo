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
import {HomeGuestPage, HomeUserPage, IndexPage} from "./pages/IndexPages";
import {LostPasswordPage} from "./app/auth/pages/LostPasswordPage";
import {useAuthStore} from "./app/auth/store";
import {Error404Page} from "./app/pages/ErrorPages";
import {LogoutAction} from "./app/auth/pages/LogoutAction";


const firebaseConfig = {
    apiKey: "AIzaSyCjKK_wTr7JBfXGjWuL5GAIJ2MYYvP1CK8",
    authDomain: "sandbox-6ac33.firebaseapp.com",
    projectId: "sandbox-6ac33",
    storageBucket: "sandbox-6ac33.appspot.com",
    messagingSenderId: "180774583906",
    appId: "1:180774583906:web:e113e1f554f498e8aedb3b"
};
export const app = initializeApp(firebaseConfig);
export const appAuth = getAuth(app);
export const appProvider = new GoogleAuthProvider();


function AppRoutes() {
    const [isAuth, logout, login] = useAuthStore(state => [state.isAuth, state.logout, state.login]);

    useEffect(() => {
        const authlistener = onAuthStateChanged(appAuth, (user) => {
            // TODO: Ensuring authentication:
            //  Save token to localstorage
            //  if empty localstorage && !store: logout()
            //  if empty localstorage && store: update to localstorage
            //  if localstorage is fresh && !store: login()
            //  if expired localstorage: check user, then repopulate + login() else logout()
            //  if !localstorage && !store && user: then do nothing
            if(isAuth() && !user) logout();
        });

        return (() => authlistener());
    }, []);

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<IndexPage />} />

          <Route element={<ProtectedRoute enable={() => isAuth(false)} fallback={<HomeUserPage />} />}>
              <Route path={S.paths.register} element={<EmailRegisterPage />} />
              <Route path={S.paths.signin} element={<EmailLogininPage />} />
              <Route path={S.paths.lostpass} element={<LostPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute enable={isAuth} fallback={<HomeGuestPage />} />}>
              <Route path={S.paths.signout} element={<LogoutAction />} />
          </Route>

          <Route path={'*'} element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
