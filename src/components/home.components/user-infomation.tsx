import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Icon, List, Modal, Page, Text } from "zmp-ui";
import { User } from "../../interface/user";
import AuthenticationService from "../../services/auth.service";
const { Item } = List;
const UserInfomation = ({ user }: { user: User }) => {
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const authService = new AuthenticationService();
  const navigate = useNavigate();

  const onLogout = () => {
    setLogoutDialogVisible(!logoutDialogVisible);
  };

  const handleLogout = async () => {
    try {
      const logoutSuccess = await authService.signOut();
      if (logoutSuccess) {
        setLogoutDialogVisible(!logoutDialogVisible);
        navigate("/");
        // Thực hiện các hành động sau khi đăng xuất thành công (ví dụ: chuyển hướng đến trang khác)
      } else {
        // Xử lý khi đăng xuất không thành công
      }
    } catch (error) {
      // Xử lý lỗi nếu có
    }
  };

  return (
    <Page>
      <Box className="mt-2 d-flex justify-content-center">
        <Avatar className="mt-2 mb-2" size={140} />
      </Box>
      <Text bold size="small" className="text-style text-center">
        {user.email}
      </Text>

      <List noSpacing={true} divider={true}>
        <Item
          title="Sample text title"
          prefix={<Icon icon="zi-user" />}
          suffix={<Icon icon="zi-chevron-right" />}
        />
        <Item
          className="text-danger"
          title="Logout"
          prefix={<Icon icon="zi-leave" />}
          onClick={onLogout}
        />
      </List>

      <Modal
        visible={logoutDialogVisible}
        title=""
        verticalActions={false}
        actions={[
          {
            text: "Cancel",
            highLight: true,
            onClick: (e: React.MouseEvent) => {
              setLogoutDialogVisible(!logoutDialogVisible);
            },
          },
          {
            text: "Ok",
            close: true,
            danger: true,
            highLight: true,
            onClick: (e: React.MouseEvent) => {
              handleLogout(); // Thêm dấu ngoặc đơn ở đây
            },
          },
        ]}
        description="Đăng xuất khỏi tài khoản này ?"
      ></Modal>
    </Page>
  );
};

export default UserInfomation;
