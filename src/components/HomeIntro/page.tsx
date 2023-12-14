import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import classNames from "classnames/bind";
import styles from "./page.module.scss";

import LayoutRender from "../LayoutRender/page";

const cx = classNames.bind(styles);

interface Props {
    delay?: number;
}

export default function Comp({ delay }: Props) {
    return (
        <Swiper
            // grabCursor={true}
            centeredSlides={true}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Autoplay, Pagination]}
            autoplay={{
                delay: delay,
                disableOnInteraction: false,
            }}
            loop={true}
            className={`mySwiper ` + cx("wraper")}
        >
            <SwiperSlide className={cx("slide")}>
                <LayoutRender />
            </SwiperSlide>
            <SwiperSlide className={cx("slide")}>
                <LayoutRender />
            </SwiperSlide>
            <SwiperSlide className={cx("slide")}>
                <LayoutRender />
            </SwiperSlide>
            <SwiperSlide className={cx("slide")}>
                <LayoutRender />
            </SwiperSlide>
            <SwiperSlide className={cx("slide")}>
                <LayoutRender />
            </SwiperSlide>
            <SwiperSlide className={cx("slide")}>
                <LayoutRender />
            </SwiperSlide>
            <SwiperSlide className={cx("slide")}>
                <LayoutRender />
            </SwiperSlide>
        </Swiper>
    );
}
