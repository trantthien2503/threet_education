import React from "react";
import { Page, Box, Button, useNavigate, Text } from "zmp-ui";

const HomePage: React.FunctionComponent = (props) => {
  const navigate = useNavigate();
  return (
    <Page className="section-container">
      <Text.Title style={{ textAlign: "center" }}>Home Page</Text.Title>
      <Box mt={6}>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => {
            navigate("/page1");
          }}
        >
          Go To Page 1
        </Button>
      </Box>
    </Page>
  );
};

export default HomePage;
