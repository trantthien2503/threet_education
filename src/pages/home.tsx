import React, { useEffect, useState } from "react";
import {
  Page,
  Box,
  Text,
  Swiper,
  useNavigate,
  Button,
  Icon,
  BottomNavigation,
} from "zmp-ui";
import DashboardComponent from "../components/home.components/dashboard";
import UserInfomation from "../components/home.components/user-infomation";
import { User } from "../interface/user";
import AuthenticationService from "../services/auth.service";
const HomePage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const authService = new AuthenticationService();
  const [activeTab, setActiveTab] = useState("main");

  const backToLoginPage = () => {
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        // Thực hiện các hành động khi người dùng đã đăng nhập
      } else {
        console.log("Không có người dùng đăng nhập");
        backToLoginPage();
        // Thực hiện các hành động khi không có người dùng đăng nhập
      }
    });
  }, []);

  return (
    <Page className="section-container-fliud pl-2 pr-2">
      <div>
        {(() => {
          switch (activeTab) {
            case "main":
              return <DashboardComponent />;
            case "me":
              return user ? <UserInfomation user={user} /> : null;
            default:
              return "Đang phát triển";
          }
        })()}
      </div>

      <BottomNavigation
        fixed
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        <BottomNavigation.Item
          key="main"
          label="Trang chủ"
          icon={<Icon icon="zi-home" />}
          activeIcon={<Icon icon="zi-home" />}
        />
        <BottomNavigation.Item
          label="Danh bạ"
          key="contact"
          icon={<Icon icon="zi-call" />}
          activeIcon={<Icon icon="zi-call-solid" />}
        />
        <BottomNavigation.Item
          label="Khám phá"
          key="discovery"
          icon={<Icon icon="zi-more-grid" />}
          activeIcon={<Icon icon="zi-more-grid-solid" />}
        />
        <BottomNavigation.Item
          key="timeline"
          label="Nhật ký"
          icon={<Icon icon="zi-clock-1" />}
          activeIcon={<Icon icon="zi-clock-1-solid" />}
        />
        <BottomNavigation.Item
          key="me"
          label="Cá nhân"
          icon={<Icon icon="zi-user" />}
          activeIcon={<Icon icon="zi-user-solid" />}
        />
      </BottomNavigation>
    </Page>
  );
};

export default HomePage;
