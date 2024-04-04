import React, { useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import Page1Page from "../pages/page1";
import NotFound from "../pages/404";
import LoginForm from "../pages/auth/loginForm";
import RegisterForm from "../pages/auth/registerForm";
import ForgetForm from "../pages/auth/forgetForm";
import HomePage from "../pages/home";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forget-password" element={<ForgetForm />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
