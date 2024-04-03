import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Box, Button, Text } from "zmp-ui";
import { User } from "../interface/user";
import FirebaseService from "../services/firebase.service";

const NotFound: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);

  const getUsers = async () => {
    const firebaseService = new FirebaseService();
    const usersData = await firebaseService.getCollection("Users");
    setUsers(usersData);
  };

  const handleButtonClick = (user: User) => {
    // Xử lý sự kiện khi nút được click
    console.log("User", user.id);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Page className="section-container">
      <div>
        <h1>User List</h1>
        <div className="user-cards">
          {users.map((user: User, index) => (
            <div key={index} className="user-card">
              <h1>Username: {user.username}</h1>
              <h1>Password: {user.password}</h1>
              <Button
                className="filter-button"
                onClick={() => handleButtonClick(user)}
              >
                Primary
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default NotFound;
