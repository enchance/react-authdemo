import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './assets/css/App.css';

import S from "./app/settings";
import {isAuth, isGuest, ProtectedRoute} from "./app/helpers";
import {EmailRegisterPage} from "./app/auth/pages/EmailRegisterPage";
import {EmailSigninPage} from "./app/auth/pages/EmailSigninPage";
import {HomeGuestPage, HomeUserPage} from "./pages/IndexPages";
import {LostPasswordPage} from "./app/auth/pages/LostPasswordPage";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={isAuth() ? <HomeUserPage /> : <HomeGuestPage />} />

          <Route element={<ProtectedRoute enable={isGuest} fallback={<HomeUserPage />} />}>
              <Route path={S.path.register} element={<EmailRegisterPage />} />
              <Route path={S.path.signin} element={<EmailSigninPage />} />
              <Route path={S.path.lostpass} element={<LostPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute enable={isAuth} fallback={<HomeGuestPage />} />}>
          </Route>

          <Route path={'*'} element={isAuth() ? <HomeUserPage /> : <HomeGuestPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
