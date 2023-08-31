import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './assets/css/App.css';

import {AuthWatcherPage} from "./app/auth/pages/AuthWatcherPage";
import {isAuth, isGuest, ProtectedRoute} from "./app/helpers";
import {EmailRegisterPage} from "./app/auth/pages/EmailRegisterPage";
import {EmailSigninPage} from "./app/auth/pages/EmailSigninPage";
import {HomeGuestPage, HomeUserPage} from "./pages/IndexPages";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={isAuth() ? <HomeUserPage /> : <HomeGuestPage />} />

          <Route element={<ProtectedRoute enable={isGuest} fallback={<HomeUserPage />} />}>
              <Route path="/auth/register" element={<EmailRegisterPage />} />
              <Route path="/auth/signin" element={<EmailSigninPage />} />
          </Route>

          <Route element={<ProtectedRoute enable={isAuth} fallback={<HomeGuestPage />} />}>
          </Route>
          
          <Route path="*" element={<AuthWatcherPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
