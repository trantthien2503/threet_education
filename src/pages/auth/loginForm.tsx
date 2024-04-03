import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Page, Box, Button, Text, Input, Icon } from "zmp-ui";

const LoginForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Vui lòng nhập email và mật khẩu.");
      return;
    }

    // Kiểm tra xem email có đúng định dạng không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Email không hợp lệ.");
      return;
    }

    // Kiểm tra xem password có chứa ký tự đặc biệt không
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (specialChars.test(password)) {
      setErrorMessage("Mật khẩu không được chứa ký tự đặc biệt.");
      return;
    }
    // Xử lý đăng nhập ở đây
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Page className="section-container">
      <h1 className="login-page--h1">Đăng nhập</h1>
      <Input
        label="Email"
        value={email}
        placeholder="Nhập email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="Nhập password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Button
        type="highlight"
        className="login-page--button"
        onClick={handleLogin}
      >
        Đăng nhập
      </Button>
    </Page>
  );
};

export default LoginForm;
