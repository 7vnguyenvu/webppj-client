import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import classNames from "classnames/bind";
import styles from "./page.module.scss";

import LayoutRender from "../LayoutRender/page";
import { memo } from "react";

const cx = classNames.bind(styles);

interface Props {
    delay?: number;
}

export default memo(function Comp({ delay }: Props) {
    return (
        <Swiper
            // grabCursor={true}
            centeredSlides={true}
            modules={[Autoplay]}
            autoplay={{
                delay: delay,
                disableOnInteraction: false,
            }}
            loop={true}
            className={`mySwiper ` + cx("wraper")}
        >
            {new Array(10).fill(0).map((page, index) => (
                <SwiperSlide key={index} className={cx("slide")}>
                    <LayoutRender />
                </SwiperSlide>
            ))}
        </Swiper>
    );
});
