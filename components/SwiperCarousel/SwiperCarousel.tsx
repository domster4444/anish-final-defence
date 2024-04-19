//@ts-nocheck

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { globalConstant } from "constant/constant";
import { RootState } from "@/app/GlobalRedux/store";
import { useSelector } from "react-redux";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function FeaturedCarousel({ featuredImage }) {
  const loggedInUserData = useSelector((state: RootState) => state.authenticated);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {featuredImage.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${item.image}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper onSwiper={setThumbsSwiper} loop={true} spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation, Thumbs]} className='mySwiper'>
        {featuredImage.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={`${globalConstant.serverURL}/storage/${loggedInUserData.schoolUniqueId}/${item.image}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
