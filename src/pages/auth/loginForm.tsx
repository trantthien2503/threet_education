import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import {
  Page,
  Box,
  Button,
  Text,
  Input,
  Icon,
  Switch,
  useSnackbar,
} from "zmp-ui";
import AuthenticationService from "../../services/auth.service";

const LoginForm: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);
  const authService = new AuthenticationService();

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

    setIsLoading(true); // Bắt đầu hiển thị spinner khi bắt đầu đăng nhập

    // Xử lý đăng nhập ở đây
    authService.login(email, password).then((response: boolean) => {
      setIsLoading(false); // Tắt spinner khi quá trình đăng nhập kết thúc
      if (response === true) {
        // Chuyển tới trang đăng nhập
        if (rememberPassword == true) {
          localStorage.setItem(
            "remember_user",
            JSON.stringify({
              email,
              password,
            })
          );
        } else {
          localStorage.removeItem("remember_user");
        }

        navigate("/home");

        openSnackbar({
          type: "success",
          icon: true,
          text: "Đăng nhập thành công",
          duration: 2000,
          position: "bottom",
        });
        console.log("Đăng nhập thành công");
      } else {
        console.log("Đăng nhập thất bại");
      }
    });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forget-password");
  };

  const handleLoginWithGoogle = () => {};

  const handleLoginWithApple = () => {};

  // Khởi tạo
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
        console.log("Người dùng đã đăng nhập:", user);
        // Thực hiện các hành động khi người dùng đã đăng nhập
      } else {
        console.log("Không có người dùng đăng nhập");
        const remember_user: string | null =
          localStorage.getItem("remember_user");
        if (remember_user) {
          const rememberedUser = JSON.parse(remember_user);
          setEmail(rememberedUser.email);
          setPassword(rememberedUser.password);
        }
        // Thực hiện các hành động khi không có người dùng đăng nhập
      }
    });

    return () => unsubscribe(); // Hủy đăng ký lắng nghe khi component unmount
  }, []);

  return (
    <Page className="section-container">
      <h1 className="login-page--h1">Login with</h1>
      <div className="d-flex justify-content-center pt-4">
        <button
          type="button"
          className="btn btn-login-with"
          onClick={handleLoginWithApple}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-apple"
            viewBox="0 0 16 16"
          >
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
          </svg>
        </button>
        <button type="button" className="btn btn-login-with">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-facebook"
            viewBox="0 0 16 16"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
          </svg>
        </button>
        <button
          type="button"
          className="btn btn-login-with"
          onClick={handleLoginWithGoogle}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-google"
            viewBox="0 0 16 16"
          >
            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
          </svg>
        </button>
      </div>

      <div className="login-page--line d-flex text-align-center w-100 pt-4 pb-4">
        <span className="login-page-line--span align-self-center"></span>
        <a className="login-page-line--a">Or</a>
        <span className="login-page-line--span align-self-center"></span>
      </div>

      <Input
        label="Email address"
        value={email}
        placeholder="Yourname@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="pt-1 pb-1">
        <Switch checked={rememberPassword} label="Remember password" />
      </div>

      <div className="pt-1 pb-1">
        <a className="text-danger" onClick={handleForgotPassword}>
          Forget password ?
        </a>
      </div>

      <Button
        type="highlight"
        className="login-page--button pt-2"
        onClick={handleLogin}
      >
        Login
      </Button>

      <span className="text-center d-flex justify-content-center pt-2">
        Don't have account?{" "}
        <a className="text-success" onClick={handleRegister}>
          Create Account
        </a>
      </span>
    </Page>
  );
};

export default LoginForm;
