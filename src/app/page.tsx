"use client";
import useAxios from "axios-hooks";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Stack, Button, Col, OverlayTrigger, Tooltip, Spinner, Image } from "react-bootstrap";
import { FaUserFriends } from "react-icons/fa";
import { FaRegNewspaper, FaPager, FaRegCalendarCheck, FaPenNib } from "react-icons/fa6";
import { useEffect, useState } from "react";

import FormAddBlog from "@/components/Forms/AddBlog/page";
import Header from "@/components/Header/page";

import HomeIntro from "@/components/HomeIntro/page";
import ContentFetching from "@/components/ContentFetching/page";
import { Blog, User } from "../../declares/interfaces";
import { useGlobalContext } from "@/context/store";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";

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
    const { user } = useGlobalContext();
    const [search, setSearch] = useState<string>("");

    const [{ data, loading, error }, refetch] = useAxios<Blog[]>({
        baseURL: ServerPath,
        url: `/${tabs?.[0]?.api}`,
    });

    const [{ data: usersdata, loading: usersloading, error: userserror }, usersRefetch] = useAxios<User[]>({
        baseURL: ServerPath,
        url: `/users`,
    });

    const [tabData, setTabData] = useState<Record<string, any>>();
    const [activeTab, setActiveTab] = useState(tabs?.[0]?.api);

    const [showFormAddBlog, setShowFormAddBlog] = useState(false);
    const [isDoneAddBlog, setIsDoneAddBlog] = useState(false);
    const [formAddBlogOut, setFormAddBlogOut] = useState(false);

    const renderTooltip = (name: string) => <Tooltip>{name}</Tooltip>;

    const scrollTo = (y: number) => {
        if (y <= HomeContentHeaderPositionScrollY) window.scrollTo(0, HomeContentHeaderPositionScrollY);
        else window.scrollTo(0, y);
    };

    const handle_ChangeTab = (tabname: any) => {
        if (tabname === activeTab) {
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

            setActiveTab(tabname);
        }
    };

    const handle_ShowFormAddBlog = () => {
        if (!user) {
            alert("Hãy đăng nhập!");
            return;
        }

        setShowFormAddBlog(true);
        setFormAddBlogOut(false);
    };

    const handle_HideFormAddBlog = () => {
        setFormAddBlogOut(true);
        setTimeout(() => {
            setShowFormAddBlog(false);
        }, 300);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search !== "") {
                    const response = await usersRefetch({
                        url: `/users/search?key=${search}`,
                        method: "post",
                    });
                    // Further processing with the response
                } else {
                    const response = await usersRefetch({
                        url: `/users`,
                        method: "get",
                    });
                }
            } catch (error) {
                // Handle error appropriately
            }
        };

        fetchData();
    }, [search, usersRefetch]);

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

    useEffect(() => {
        if (isDoneAddBlog) {
            handle_ChangeTab("blogs");
            setIsDoneAddBlog(false);
        }
    }, [isDoneAddBlog]);

    return (
        <>
            <Header isHomePage={true}></Header>

            <main className={cx("wraper")}>
                <section className={cx("intro")}>
                    <HomeIntro delay={3000} />
                </section>
                <section className={cx("content")}>
                    <Stack direction="horizontal" className={cx("header")}>
                        <Col md={2} className={cx("sidebar")}>
                            {!!user && (
                                <Link href={`/${user.info?.nick_name}`}>
                                    <Image src={user.images?.avatar?.[0].url} alt={user.images?.avatar?.[0].filename} />
                                    <span className={cx("name")}>{user.info?.full_name}</span>
                                </Link>
                            )}
                        </Col>
                        <Col xs={12} md={9} lg={5} className={cx("main", "mx-auto")}>
                            {tabs &&
                                tabs.map((tab, index) => (
                                    <OverlayTrigger key={index} placement="bottom" overlay={renderTooltip(tab.name)}>
                                        <Button
                                            className={`${activeTab === tab.api ? cx("active") : ""}`}
                                            onClick={() => {
                                                handle_ChangeTab(tab.api);
                                            }}
                                        >
                                            {tab.icon}
                                        </Button>
                                    </OverlayTrigger>
                                ))}
                        </Col>
                        <Col lg={2} className={cx("roles")}>
                            <input type="text" placeholder="Search.." value={search} onChange={(e) => setSearch(e.target.value)} />
                            <IoSearch />
                        </Col>
                    </Stack>
                    <Stack direction="horizontal" className={cx("body")}>
                        <Col md={2} className={cx("sidebar")}>
                            <h5>Người dùng</h5>

                            {usersloading && (
                                <div className="d-flex justify-content-start mt-4">
                                    <Spinner variant="success" animation="border" />
                                </div>
                            )}
                            {usersdata &&
                                usersdata.map(
                                    (u, index) =>
                                        u.user_id !== user?.user_id && (
                                            <Link href={`/${u.info?.nick_name}`} key={index}>
                                                <Image src={u.images?.avatar?.[0].url} alt={u.images?.avatar?.[0].filename} />
                                                <p>{u.info?.full_name}</p>
                                            </Link>
                                        )
                                )}
                        </Col>
                        <Col xs={12} md={9} lg={5} className={cx("main", "mx-auto")}>
                            {loading && (
                                <div className="d-flex justify-content-center mt-4">
                                    <Spinner variant="success" animation="border" />
                                </div>
                            )}
                            {tabData?.[activeTab!]?.data && <ContentFetching type={activeTab} list={tabData?.[activeTab!]?.data} />}
                        </Col>
                        <Col lg={2} className={cx("roles")}>
                            <span onClick={handle_ShowFormAddBlog}>
                                <FaPenNib />
                                <p>Tạo bài viết</p>
                            </span>
                        </Col>
                    </Stack>
                </section>
            </main>
            {showFormAddBlog && (
                <>
                    <div className={cx("overlay", { formOut: formAddBlogOut })}></div>
                    <FormAddBlog formOut={formAddBlogOut} setShowForm={handle_HideFormAddBlog} setIsDoneAddBlog={setIsDoneAddBlog} />
                </>
            )}
        </>
    );
}
