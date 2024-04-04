import React from "react";
import { Swiper, Box } from "zmp-ui";

const DashboardComponent: React.FunctionComponent = () => {
  return (
    <Box
      mt={6}
      flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Swiper autoplay duration={2000} loop>
        <Swiper.Slide>
          <img
            className="slide-img"
            src="https://stc-zmp.zadn.vn/zmp-zaui/images/0e05d63a7a93a6cdff826.jpg"
            alt="slide-1"
          />
        </Swiper.Slide>
        <Swiper.Slide>
          <img
            className="slide-img"
            src="https://stc-zmp.zadn.vn/zmp-zaui/images/0f7c061caab576eb2fa45.jpg"
            alt="slide-2"
          />
        </Swiper.Slide>
        <Swiper.Slide>
          <img
            className="slide-img"
            src="https://stc-zmp.zadn.vn/zmp-zaui/images/321fb45f18f6c4a89de78.jpg"
            alt="slide-3"
          />
        </Swiper.Slide>
        <Swiper.Slide>
          <img
            className="slide-img"
            src="https://stc-zmp.zadn.vn/zmp-zaui/images/4f417921d58809d650997.jpg"
            alt="slide-4"
          />
        </Swiper.Slide>
        <Swiper.Slide>
          <img
            className="slide-img"
            src="https://stc-zmp.zadn.vn/zmp-zaui/images/677fad2e0187ddd984969.jpg"
            alt="slide-5"
          />
        </Swiper.Slide>
      </Swiper>
    </Box>
  );
};

export default DashboardComponent;
