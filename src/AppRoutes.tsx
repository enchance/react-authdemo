import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/css/App.css';

import S from "./app/settings";
import {ProtectedRoute} from "./app/helpers";
import {EmailRegisterPage} from "./app/auth/pages/EmailRegisterPage";
import {EmailLogininPage} from "./app/auth/pages/EmailLogininPage";
import {HomeGuestPage, HomeUserPage, IndexPage} from "./pages/IndexPages";
import {LostPasswordPage} from "./app/auth/pages/LostPasswordPage";
import {useAuthStore} from "./app/auth/store";
import {Error404Page} from "./app/pages/ErrorPages";
import {LogoutAction} from "./app/auth/pages/LogoutAction";


function AppRoutes() {
    const isAuth = useAuthStore(state => state.isAuth);

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<IndexPage />} />

          <Route element={<ProtectedRoute enable={() => isAuth(false)} fallback={<HomeUserPage />} />}>
              <Route path={S.path.register} element={<EmailRegisterPage />} />
              <Route path={S.path.signin} element={<EmailLogininPage />} />
              <Route path={S.path.lostpass} element={<LostPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute enable={isAuth} fallback={<HomeGuestPage />} />}>
              <Route path={S.path.signout} element={<LogoutAction />} />
          </Route>

          <Route path={'*'} element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
