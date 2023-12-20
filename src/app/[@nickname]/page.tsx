"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useAxios from "axios-hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Col, Container, Row, Image, Button, Spinner, Tabs, Tab, Nav } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styles from "./page.module.scss";
import {
    FaCircle,
    FaCircleUser,
    FaCommentDots,
    FaEllipsisVertical,
    FaGithub,
    FaHeart,
    FaImage,
    FaInstagram,
    FaPhone,
    FaRegCommentDots,
    FaRegEye,
    FaRegHeart,
    FaRegShareFromSquare,
    FaShare,
    FaSquareFacebook,
    FaTiktok,
    FaYoutube,
} from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { numberConvert } from "../../../services/numconvert";
import { Blog, User, UserImage, UserInfo } from "../../../declares/interfaces";
import { timePassed } from "../../../services/timepassed";
import { useGlobalContext } from "../../context/store";

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;

const tabs = [
    {
        name: "Giới thiệu",
        eventKey: "abouts",
    },
    {
        name: "Bài viết",
        eventKey: "blogs",
    },
    {
        name: "Ảnh",
        eventKey: "images",
    },
    {
        name: "Khách",
        eventKey: "viewer",
    },
];

export default function Comp() {
    const { user } = useGlobalContext();
    console.log(user);

    const pathname = usePathname().substring(1);

    const [{ data, loading, error }, refetch] = useAxios<User>({
        baseURL: ServerPath,
        url: `/users/user/${pathname}`,
    });

    const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.name);
    const [isReload_Abouts, setIsReload_Abouts] = useState<boolean>(false);
    const [isReload_Blogs, setIsReload_Blogs] = useState<boolean>(false);
    const [isReload_Images, setIsReload_Images] = useState<boolean>(false);
    const [isReload_Viewer, setIsReload_Viewer] = useState<boolean>(false);

    const handle_ChangeTab = (tabname: string) => {
        if (tabname === activeTab) {
            scrollTo(0);
            switch (tabname) {
                case "Giới thiệu":
                    setIsReload_Abouts(true);
                    break;

                case "Bài viết":
                    setIsReload_Blogs(true);
                    break;

                case "Ảnh":
                    setIsReload_Images(true);
                    break;

                case "Khách":
                    setIsReload_Viewer(true);
                    break;
            }
        } else {
            setIsReload_Blogs(false);
            setIsReload_Images(false);
            setIsReload_Viewer(false);
            setActiveTab(tabname);
        }
    };

    const scrollTo = (y: number) => {
        window.scrollTo(0, y);
    };

    return (
        <main className={cx("wraper")}>
            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <Spinner variant="success" animation="border" />
                </div>
            ) : (
                <Container>
                    <Row>
                        <Col md={4} className={cx("col-left")}>
                            <Row className={cx("user-avatar")}>
                                <Swiper slidesPerView={1} loop={true}>
                                    {data?.images?.avatar &&
                                        data?.images?.avatar.map((image, index) => (
                                            <SwiperSlide key={index} className={cx("image")}>
                                                <Image src={image.url} alt={image.filename} />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </Row>
                            <Row className={cx("user-name flex-column")}>
                                <Row className={cx("flex-column")}>
                                    <Col>
                                        <h2 className={cx("user-name__fullname")}>{data?.info?.full_name}</h2>
                                    </Col>
                                    <Col>
                                        <p className={cx("user-name__nickname")}>{data?.info?.nick_name}</p>
                                    </Col>
                                </Row>
                                <Row className={cx("user-editbtn", "mb-4")}>
                                    <Button>Chỉnh sửa thông tin</Button>
                                </Row>
                                <Row className={cx("user-info")}>
                                    <Col>
                                        <FaRegHeart />
                                        <span>{data?.like && numberConvert(data?.like)}</span>
                                    </Col>
                                    <Col>
                                        <FaRegEye />
                                        <span>{data?.view && numberConvert(data?.view)}</span>
                                        {/* {item?.view && numberConvert(item?.view)} */}
                                    </Col>
                                </Row>
                            </Row>
                            <Row className={cx(" mt-3")}>
                                <Row>
                                    <hr />
                                </Row>
                            </Row>
                            <Row className={cx("user-contact flex-column")}>
                                {/* {data?.info?.birth !== "" && (
                                    <Col className={cx("user-contact__item")}>
                                        <LiaBirthdayCakeSolid />
                                        <span>{data?.info?.birth}</span>
                                    </Col>
                                )} */}
                                {data?.info?.contact?.phone !== "" && (
                                    <Col className={cx("user-contact__item")}>
                                        <FaPhone />
                                        <span>{data?.info?.contact?.phone}</span>
                                    </Col>
                                )}
                                {data?.info?.contact?.email !== "" && (
                                    <Col className={cx("user-contact__item")}>
                                        <IoMail />
                                        <span>{data?.info?.contact?.email}</span>
                                    </Col>
                                )}

                                {data?.info?.contact?.socials &&
                                    data?.info?.contact?.socials.map((item, index) => (
                                        <Col key={index} className={cx("user-contact__item")}>
                                            {item.name == "Facebook" && <FaSquareFacebook />}
                                            {item.name == "TikTok" && <FaTiktok />}
                                            {item.name == "Youtube" && <FaYoutube />}
                                            {item.name == "Github" && <FaGithub />}
                                            {item.name == "Instagram" && <FaInstagram />}
                                            <a target="_blank" href={item?.url}>
                                                {item?.hyperlink}
                                            </a>
                                        </Col>
                                    ))}
                            </Row>
                        </Col>
                        <Col md={8} className={cx("col-right")}>
                            <Row className={cx("user-cover")}>
                                <Swiper slidesPerView={1} loop={true}>
                                    {data?.images?.cover &&
                                        data?.images?.cover.map((image, index) => (
                                            <SwiperSlide key={index} className={cx("image")}>
                                                <Image src={image.url} alt={image.filename} />
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            </Row>

                            <Tab.Container defaultActiveKey="abouts">
                                <Row className={cx("user-show", "flex-column")}>
                                    <Col>
                                        <Nav variant="pills" className={cx("user-tab")}>
                                            {tabs &&
                                                tabs.map((tab, index) => (
                                                    <Nav.Item key={index}>
                                                        <Nav.Link
                                                            eventKey={tab.eventKey}
                                                            className={cx("user-tab__link", `${activeTab === tab.name ? cx("active") : ""}`)}
                                                            onClick={() => {
                                                                handle_ChangeTab(tab.name);
                                                            }}
                                                        >
                                                            <span>{tab.name}</span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                ))}
                                        </Nav>
                                    </Col>
                                    <Col>
                                        <Tab.Content className={cx("user-data")}>
                                            <Tab.Pane eventKey="abouts">
                                                {data?.info && (
                                                    <DataShowAbouts
                                                        isReload_={isReload_Abouts}
                                                        setIsReload_={setIsReload_Abouts}
                                                        dataload={data.info}
                                                    />
                                                )}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="blogs">
                                                {data && <DataShowBlogs isReload_={isReload_Blogs} setIsReload_={setIsReload_Blogs} user={data} />}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="images">
                                                {data?.images && (
                                                    <DataShowImages
                                                        isReload_={isReload_Images}
                                                        setIsReload_={setIsReload_Images}
                                                        dataload={data.images}
                                                    />
                                                )}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="viewer">
                                                {data?.viewer && (
                                                    <DataShowViewer
                                                        isReload_={isReload_Viewer}
                                                        setIsReload_={setIsReload_Viewer}
                                                        dataload={data.viewer}
                                                    />
                                                )}
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>
                            </Tab.Container>
                        </Col>
                    </Row>
                </Container>
            )}
        </main>
    );
}

//////////////////////////////////////////////////////////////////// [ABOUTS]
interface PropsDataShowAbouts {
    dataload: UserInfo;
    isReload_: boolean;
    setIsReload_: Dispatch<SetStateAction<boolean>>;
}
function DataShowAbouts({ dataload, isReload_, setIsReload_ }: PropsDataShowAbouts) {
    const [info, setInfo] = useState<UserInfo>(dataload);

    const [{ data, loading, error }, refetch] = useAxios<User>({
        baseURL: ServerPath,
        url: `/users/user/${info.nick_name}`,
    });

    useEffect(() => {
        if (isReload_) {
            console.log("Reloading...");
            refetch();
            if (data) {
                setIsReload_(false);
                data.info && setInfo(data.info);
            }
        }
    }, [isReload_]);

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center mt-2">
                    <Spinner variant="success" animation="border" />
                </div>
            ) : (
                <div className={cx("abouts")}>
                    {info.bio !== "" && (
                        <div>
                            <span>Bio</span>
                            <p>{info.bio}</p>
                        </div>
                    )}
                    {info.description !== "" && (
                        <div>
                            <span>Mô tả</span>
                            <p>{info.description}</p>
                        </div>
                    )}
                    {info.birth !== "" && (
                        <div>
                            <span>Sinh nhật</span>
                            <p>{info.birth}</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

//////////////////////////////////////////////////////////////////// [BLOGS]
interface PropsDataShowBlogs {
    user: User;
    isReload_: boolean;
    setIsReload_: Dispatch<SetStateAction<boolean>>;
}
function DataShowBlogs({ user, isReload_, setIsReload_ }: PropsDataShowBlogs) {
    const [{ data: blogData, loading: blogLoading, error }, blogRefetch] = useAxios<Blog[]>({
        baseURL: ServerPath,
        url: `/blogs/user/${user?.info?.nick_name}`,
    });

    useEffect(() => {
        if (isReload_) {
            console.log("Reloading...");
            blogRefetch();
            if (blogData) {
                setIsReload_(false);
            }
        }
    }, [isReload_]);

    return (
        <>
            {blogLoading ? (
                <div className="d-flex justify-content-center mt-2">
                    <Spinner variant="success" animation="border" />
                </div>
            ) : blogData?.length !== 0 ? (
                <>
                    {blogData &&
                        blogData.map((blog, index) => (
                            <div key={index} className={cx("blog")}>
                                <div className={cx("header")}>
                                    <Link href={`/${user?.info?.nick_name}`}>
                                        <Image src={user.images?.avatar?.[0]?.url} alt="avatar" className={cx("header__avatar")} />
                                    </Link>
                                    <div className={cx("header__info")}>
                                        <span className={cx("header__info-name")}>{user?.info?.full_name}</span>
                                        <span className={cx("header__info-timepass")}>{timePassed(blog?.createdAt)}</span>
                                    </div>
                                    <div className={cx("header__more")}>
                                        <FaEllipsisVertical />
                                    </div>
                                </div>
                                <div className={cx("body")}>
                                    {blog?.content?.title && <h4 className={cx("title")}>{blog?.content?.title}</h4>}
                                    {blog?.content?.content && <p className={cx("content")}>{blog?.content?.content}</p>}
                                    {blog?.content?.thumbnail?.length !== 0 && (
                                        <div className={cx("thumbnail")}>
                                            {blog?.content?.thumbnail?.length === 1 && <Image src={blog.content.thumbnail[0].url} alt="" />}

                                            {blog?.content?.thumbnail?.length === 2 && (
                                                <div>
                                                    <Image src={blog.content.thumbnail[0].url} alt="" />
                                                    <Image src={blog.content.thumbnail[1].url} alt="" />
                                                </div>
                                            )}

                                            {blog?.content?.thumbnail?.length === 3 && (
                                                <div>
                                                    <Image src={blog.content.thumbnail[0].url} alt="" />
                                                    <div>
                                                        <Image src={blog.content.thumbnail[1].url} alt="" />
                                                        <Image src={blog.content.thumbnail[2].url} alt="" />
                                                    </div>
                                                </div>
                                            )}

                                            {blog?.content?.thumbnail?.length === 4 && (
                                                <div>
                                                    <div>
                                                        <Image src={blog.content.thumbnail[0].url} alt="" />
                                                        <Image src={blog.content.thumbnail[1].url} alt="" />
                                                    </div>
                                                    <div>
                                                        <Image src={blog.content.thumbnail[2].url} alt="" />
                                                        <Image src={blog.content.thumbnail[3].url} alt="" />
                                                    </div>
                                                </div>
                                            )}

                                            {blog?.content?.thumbnail?.length && blog?.content?.thumbnail?.length > 4 && (
                                                <div>
                                                    <div>
                                                        <Image src={blog.content.thumbnail[0].url} alt="" />
                                                        <Image src={blog.content.thumbnail[1].url} alt="" />
                                                    </div>
                                                    <div>
                                                        <Image src={blog.content.thumbnail[2].url} alt="" />
                                                        <Image src={blog.content.thumbnail[3].url} alt="" />
                                                        <span className={cx("overlay")}>+ {blog?.content?.thumbnail?.length - 4}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className={cx("interact")}>
                                    <div>
                                        <FaRegHeart />
                                        {blog?.like}
                                    </div>
                                    <div>
                                        <div>
                                            <FaRegCommentDots />
                                            {blog?.comment}
                                        </div>
                                        <div>
                                            <FaRegShareFromSquare />
                                            {blog?.share}
                                        </div>
                                        <div>
                                            <FaRegEye />
                                            {blog?.view && numberConvert(blog?.view)}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("action")}>
                                    <Button>
                                        <FaHeart />
                                        Thích
                                    </Button>
                                    <Button>
                                        <FaCommentDots />
                                        Bình luận
                                    </Button>
                                    <Button>
                                        <FaShare />
                                        Chia sẻ
                                    </Button>
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <div className={cx("none")}>
                    <span style={{ padding: 20, lineHeight: 3 }}>Chưa có bài viết nào!</span>
                </div>
            )}
        </>
    );
}

//////////////////////////////////////////////////////////////////// [IMAGES]
interface PropsDataShowImages {
    dataload: UserImage;
    isReload_: boolean;
    setIsReload_: Dispatch<SetStateAction<boolean>>;
}
function DataShowImages({ dataload, isReload_, setIsReload_ }: PropsDataShowImages) {
    const pathname = usePathname().substring(1);
    const [images, setImages] = useState<UserImage>(dataload);
    // const [tmp, settmp] = useState<string | undefined>(images.avatar?.[0].filename);

    const [{ data, loading, error }, refetch] = useAxios<User>({
        baseURL: ServerPath,
        url: `/users/user/${pathname}`,
    });

    useEffect(() => {
        if (isReload_) {
            refetch();
            if (data) {
                setIsReload_(false);
                data.images && setImages(data.images);
            }
        }
    }, [isReload_]);

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center mt-2">
                    <Spinner variant="success" animation="border" />
                </div>
            ) : (
                <>
                    <div className={cx("images", "avatar")}>
                        <span>
                            <FaCircleUser />
                            Ảnh đại diện
                        </span>
                        <div>
                            {images?.avatar &&
                                images.avatar.map((img, index) => (
                                    <Link key={index} href={`#/image/${img.filename}`}>
                                        <Image src={img.url} alt={img.filename} />
                                    </Link>
                                ))}
                        </div>
                    </div>
                    <div className={cx("images", "cover")}>
                        <span>
                            <FaImage />
                            Ảnh bìa
                        </span>
                        <div>
                            {images?.cover &&
                                images.cover.map((img, index) => (
                                    <Link key={index} href={`#/image/${img.filename}`}>
                                        <Image src={img.url} alt={img.filename} />
                                    </Link>
                                ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

//////////////////////////////////////////////////////////////////// [VIEWER]
interface PropsDataShowViewer {
    dataload: string[];
    isReload_: boolean;
    setIsReload_: Dispatch<SetStateAction<boolean>>;
}
function DataShowViewer({ dataload, isReload_, setIsReload_ }: PropsDataShowViewer) {
    const [{ data, loading, error }, refetch] = useAxios<User[]>({
        baseURL: ServerPath,
        url: `/users/viewer?list=${dataload.toString()}`,
        method: "post",
    });

    useEffect(() => {
        if (isReload_) {
            console.log("Reloading...");
            refetch();
            if (data) {
                setIsReload_(false);
            }
        }
    }, [isReload_]);

    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center mt-2">
                    <Spinner variant="success" animation="border" />
                </div>
            ) : data?.length !== 0 ? (
                <div className={cx("viewer")}>
                    {data &&
                        data.map((user, index) => (
                            <Link key={index} href={`/${user.info?.nick_name}`}>
                                <Image src={user.images?.avatar?.[0].url} alt={user.images?.avatar?.[0].filename} />
                                <span className={cx("name")}>{user.info?.full_name}</span>
                            </Link>
                        ))}
                </div>
            ) : (
                <div className={cx("none")}>
                    <span>Gần đây chưa có người ghé qua!</span>
                </div>
            )}
        </>
    );
}
