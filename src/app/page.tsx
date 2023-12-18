"use client";
import useAxios from "axios-hooks";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Stack, Button, Col, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import { FaRegNewspaper, FaPager, FaRegCalendarCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

import Header from "../components/Header/page";

import HomeIntro from "../components/HomeIntro/page";
import ContentFetching from "../components/ContentFetching/page";
import { Blog } from "../../declares/interfaces";

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;
const HomeContentHeaderPositionScrollY = 560;

const tabs = [
    {
        name: "Bài viết",
        icon: <FaRegNewspaper />,
        api: "blogs",
    },
    {
        name: "Trang quảng bá",
        icon: <FaPager />,
        api: "pages",
    },
    {
        name: "Sự kiện",
        icon: <FaRegCalendarCheck />,
        api: "events",
    },
];

export default function Home() {
    const [{ data, loading, error }, refetch] = useAxios<Blog[]>({
        baseURL: ServerPath,
        url: `/${tabs?.[0]?.api}`,
    });

    const renderTooltip = (name: string) => <Tooltip>{name}</Tooltip>;

    const [tabData, setTabData] = useState<Record<string, any>>();
    const [activeTab, setActiveTab] = useState(tabs?.[0]?.api);

    // console.log("tabData hiện tại");
    // console.log(tabData);

    const handle_ChangeTab = (tab: any) => {
        if (tab.api === activeTab) {
            scrollTo(0);
            refetch({
                url: `/${activeTab}`,
            });
        } else {
            setTabData((prev) => ({
                ...prev,
                [activeTab!]: {
                    data: prev?.[activeTab!]?.data,
                    currentPos: window.scrollY,
                },
            }));

            setActiveTab(tab.api);
        }
    };

    const scrollTo = (y: number) => {
        if (y <= HomeContentHeaderPositionScrollY) window.scrollTo(0, HomeContentHeaderPositionScrollY);
        else window.scrollTo(0, y);
    };

    useEffect(() => {
        if (tabData?.[activeTab!] && data) {
            console.log(`[${activeTab.replace(/^./, (str) => str.toUpperCase())}] Updating...`);
            setTabData((prev) => ({
                ...prev,
                [activeTab!]: {
                    data: data,
                    currentPos: 0,
                },
            }));
        }

        if (!tabData?.[activeTab!] && data) {
            console.log(`[${activeTab.replace(/^./, (str) => str.toUpperCase())}] Loading...`);
            setTabData((prev) => {
                const initialState: Record<string, any | number> = { ...prev };
                initialState[activeTab] = {
                    data: data,
                    currentPos: 0,
                };
                return initialState;
            });
        }
    }, [data]);

    useEffect(() => {
        scrollTo(tabData?.[activeTab!]?.currentPos);
        if (!tabData?.[activeTab!]) {
            refetch({
                url: `/${activeTab}`,
            });
        }
    }, [activeTab]);

    return (
        <>
            <Header isHomePage={true}></Header>

            <main className={cx("wraper")}>
                <section className={cx("intro")}>
                    <HomeIntro delay={3000} />
                </section>
                <section className={cx("content")}>
                    <Stack direction="horizontal" gap={4} className={cx("header")}>
                        <Col xs={0} md={2} className={cx("sidebar")}>
                            Sidebar header
                        </Col>
                        <Col xs={12} md={9} lg={5} className={cx("main", "mx-auto")}>
                            {tabs &&
                                tabs.map((tab, index) => (
                                    <OverlayTrigger key={index} placement="bottom" overlay={renderTooltip(tab.name)}>
                                        <Button
                                            className={`${activeTab === tab.api ? cx("active") : ""}`}
                                            onClick={() => {
                                                handle_ChangeTab(tab);
                                            }}
                                        >
                                            {tab.icon}
                                        </Button>
                                    </OverlayTrigger>
                                ))}
                        </Col>
                        <Col xs={0} lg={2} className={cx("roles")}>
                            Role header
                        </Col>
                    </Stack>
                    <Stack direction="horizontal" gap={2} className={cx("body")}>
                        <Col xs={0} md={2} className={cx("sidebar")}>
                            <div>
                                <h2>sidebar left</h2>
                            </div>
                        </Col>
                        <Col xs={12} md={9} lg={5} className={cx("main", "mx-auto")}>
                            {loading && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Spinner animation="border" />
                                </div>
                            )}
                            {/* {<ContentFetching type={activeTab} data={tabData?.[activeTab!]?.data} />} */}
                            {tabData?.[activeTab!]?.data && <ContentFetching type={activeTab} list={tabData?.[activeTab!]?.data} />}
                        </Col>
                        <Col xs={0} lg={2} className={cx("roles")}>
                            <span>Role body</span>
                        </Col>
                    </Stack>
                </section>
            </main>
        </>
    );
}
