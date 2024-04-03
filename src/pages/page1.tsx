import React from "react";
import { useNavigate } from "react-router-dom";
import { Page, Box, Button, Text } from "zmp-ui";

const Page1Page: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Page className="section-container">
      <Text.Title style={{ textAlign: "center" }}>Page 1</Text.Title>
      <Box mt={6}>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => {
            navigate("/");
          }}
        >
          Go To Home
        </Button>
      </Box>
      <Box mt={6}>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => {
            navigate("/page2");
          }}
        >
          Not Found
        </Button>
      </Box>
    </Page>
  );
};

export default Page1Page;
