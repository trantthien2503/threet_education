import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Button, Input } from "zmp-ui";
import AuthenticationService from "../../services/auth.service";

const ForgetForm: React.FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Page className="section-container">
      <h1 className="login-page--h1">Forget Password</h1>
    </Page>
  );
};

export default ForgetForm;
