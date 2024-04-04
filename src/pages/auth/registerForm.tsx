import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Button, Input, useSnackbar } from "zmp-ui";
import AuthenticationService from "../../services/auth.service";

const RegisterForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
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

    // Kiểm tra xem password có chứa ký tự đặc biệt không
    if (specialChars.test(rePassword)) {
      setErrorMessage("Mật khẩu không được chứa ký tự đặc biệt.");
      return;
    }

    if (password != rePassword) {
      setErrorMessage("Mật khẩu không khớp !");
      return;
    }

    setIsLoading(true); // Bắt đầu hiển thị spinner khi bắt đầu đăng kí

    const authService = new AuthenticationService();
    authService.register(email, password).then((response: boolean) => {
      setIsLoading(false); // Tắt spinner khi quá trình đăng kí kết thúc
      if (response === true) {
        openSnackbar({
          type: "success",
          icon: true,
          text: "Đăng kí thành công",
          duration: 2000,
          position: "bottom",
        });

        // Chuyển tới trang đăng nhập
        navigate("/");
        console.log("Đăng kí thành công");
      } else {
        console.log("Đăng kí thất bại");
      }
    });
  };

  return (
    <Page className="section-container">
      <h1 className="login-page--h1">Đăng kí</h1>
      <Input
        label="Email*"
        value={email}
        placeholder="Youremail@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        label="Password*"
        type={"password"}
        value={password}
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input.Password
        label="Re-Password*"
        type={"password"}
        value={rePassword}
        placeholder="Your Re-password"
        onChange={(e) => setRePassword(e.target.value)}
      />

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <Button
        type="highlight"
        className="login-page--button"
        onClick={handleRegister}
      >
        Đăng kí
      </Button>

      {isLoading && (
        <div className="register-page--spinner-overlay">
          <div className="register-page--spinner-container">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default RegisterForm;
