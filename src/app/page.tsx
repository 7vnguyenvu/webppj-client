"use client";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import HomeIntro from "../components/HomeIntro/page";
import { Col, Stack } from "react-bootstrap";

const cx = classNames.bind(styles);

export default function Home() {
    return (
        <main className={cx("wraper")}>
            <section className={cx("intro")}>
                <HomeIntro delay={3000} />
            </section>
            <section className={cx("content")}>
                <Stack direction="horizontal" gap={2}>
                    <Col xs={3} className={cx("sidebar")}>
                        sidebar
                    </Col>
                    <Col xs={6} className={cx("main")}>
                        Main
                    </Col>
                    <Col xs={3} className={cx("roles")}>
                        Role
                    </Col>
                </Stack>
            </section>
        </main>
    );
}
