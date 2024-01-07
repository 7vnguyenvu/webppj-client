import { Col, Container, Row } from "react-bootstrap";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import Background from "./comps/Background/page";
import CoverImage from "./comps/CoverImage/page";
import Avatar from "./comps/Avatar/page";
import Name from "./comps/Name/page";
import Slogan from "./comps/Slogan/page";
import PageInfo from "./comps/PageInfo/page";
import PageInfoContent from "./comps/PageInfoContent/page";
import { LayoutRender, Page } from "../../../declares/interfaces";
import Link from "next/link";

const cx = classNames.bind(styles);

// Dummy data
const layouts = [
    {
        id: "1",
        name: "Layout 1",
        items: [
            {
                type: "Background",
                colConfig: {},
                styles: {
                    backgroundColor: "inherit",
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                    zIndex: 0,
                    opacity: 0.6,
                },
            },
            {
                type: "CoverImage",
                colConfig: {
                    md: {
                        span: 10,
                        offset: 1,
                    },
                    lg: {},
                    xl: {},
                    xxl: {},
                },
                styles: {
                    backgroundColor: "#ebbaba80",
                    height: "60%",
                    marginTop: "3%",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    zIndex: 1,
                },
            },
            {
                type: "Avatar",
                colConfig: {},
                styles: {
                    backgroundColor: "#fff",
                    width: "auto",
                    height: "auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "absolute",
                    top: "44%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: ".5rem solid #121212",
                    zIndex: 1,
                },
            },
            {
                type: "Name",
                colConfig: {},
                styles: {
                    backgroundColor: "#272727",
                    color: "#fff",
                    padding: ".2rem 2.4vw",
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    textAlign: "center",
                    width: "auto",
                    height: "auto",
                    borderRadius: "50px",
                    position: "absolute",
                    top: "84%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: ".1rem solid #121212",
                    zIndex: 2,
                },
            },
            {
                type: "Slogan",
                colConfig: {
                    md: {
                        offset: 7,
                    },
                    lg: {
                        offset: 8,
                    },
                    xl: {},
                    xxl: {},
                },
                styles: {
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 400,
                    fontStyle: "italic",
                    textShadow: "2px 2px 4px #000",
                    textAlign: "right",
                    width: "auto",
                    height: "auto",
                    position: "absolute",
                    top: "10%",
                    zIndex: 2,
                },
            },
            {
                type: "PageInfo",
                colConfig: {
                    md: {
                        offset: 0,
                    },
                    lg: {
                        offset: 1,
                    },
                    xl: {
                        offset: 2,
                    },
                    xxl: {},
                },
                styles: {
                    width: "auto",
                    position: "absolute",
                    top: "70%",
                    zIndex: 2,
                },
            },
            {
                type: "PageInfoContent",
                colConfig: {
                    md: {
                        offset: 8,
                    },
                    lg: {
                        offset: 8,
                    },
                    xl: {},
                    xxl: {},
                },
                styles: {
                    width: "auto",
                    position: "absolute",
                    top: "70%",
                    zIndex: 2,
                },
            },
        ],
    },
    {
        id: "2",
        name: "Layout 2",
        items: [
            {
                type: "Background",
                colConfig: {},
                styles: {
                    backgroundColor: "inherit",
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                    zIndex: 0,
                    opacity: 0.6,
                },
            },
            {
                type: "CoverImage",
                colConfig: {
                    md: {
                        span: 10,
                        offset: 2,
                    },
                    lg: {},
                    xl: {},
                    xxl: {},
                },
                styles: {
                    backgroundColor: "#ebbaba80",
                    height: "60%",
                    marginTop: "3%",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    zIndex: 1,
                },
            },
            {
                type: "Avatar",
                colConfig: {
                    md: {
                        offset: 0,
                    },
                    lg: {},
                    xl: {},
                    xxl: {},
                },
                styles: {
                    backgroundColor: "#fff",
                    width: "auto",
                    height: "auto",
                    borderRadius: "2rem",
                    overflow: "hidden",
                    position: "absolute",
                    top: "14%",
                    border: ".2rem solid #272727",
                    zIndex: 1,
                },
            },
            {
                type: "Name",
                colConfig: {},
                styles: {
                    backgroundColor: "#272727",
                    color: "#fff",
                    padding: ".2rem 4vw",
                    fontSize: "1.7rem",
                    fontWeight: 700,
                    fontStyle: "italic",
                    textAlign: "center",
                    width: "auto",
                    height: "auto",
                    position: "absolute",
                    top: "70%",
                    borderTopLeftRadius: "2rem",
                    borderBottomRightRadius: "2rem",
                    zIndex: 2,
                },
            },
            {
                type: "Slogan",
                colConfig: {
                    md: {
                        offset: 9,
                    },
                    lg: {},
                    xl: {},
                    xxl: {},
                },
                styles: {
                    color: "#fff",
                    fontSize: "1rem",
                    fontWeight: 400,
                    fontStyle: "italic",
                    textShadow: "2px 2px 4px #000",
                    textAlign: "right",
                    width: "auto",
                    height: "auto",
                    position: "absolute",
                    top: "10%",
                    zIndex: 2,
                },
            },
            {
                type: "PageInfo",
                colConfig: {
                    md: {
                        offset: 1,
                    },
                    lg: {},
                    xl: {},
                    xxl: {},
                },
                styles: {
                    width: "auto",
                    position: "absolute",
                    top: "82%",
                    zIndex: 2,
                },
            },
            {
                type: "PageInfoContent",
                colConfig: {
                    md: {
                        offset: 8,
                    },
                    lg: {},
                    xl: {},
                    xxl: {},
                },
                styles: {
                    width: "auto",
                    position: "absolute",
                    top: "70%",
                    zIndex: 2,
                },
            },
        ],
    },
];

const pages: Page[] = [
    {
        page_id: "1243214",

        owner_id: "20231211133753643",

        layout_id: "2",

        thumbnail: {
            filename: "default.png",
            url: "http://localhost:7000/images/layouts/page-intro-thumbnails/default.png",
        },

        show: {
            name: "SEVEN - V | FIFTY TWO",
            slogan: `Chấm dứt chuỗi ngày vô vọng
            Vì đã có em là người ở trong lòng ^^`,
            images: {
                background: {
                    hide: false,
                    filename: "default.png",
                    url: "http://localhost:7000/images/cover-images/admin.jpg",
                },
                avatar: {
                    hide: false,
                    filename: "7V_NGUYENVU_NEW.png",
                    url: "http://localhost:7000/images/avatars/7V_NGUYENVU_NEW.png",
                },
                cover: [
                    {
                        hide: false,
                        filename: "admin.jpg",
                        url: "http://localhost:7000/images/cover-images/admin.jpg",
                    },
                ],
            },
        },

        pageinfo: {
            vertical: false,
            info: {
                star: 9,
                like: 597,
                cmt: 12943,
                share: 498,
            },
        },

        pageinfocontent: {
            vertical: false,
            info: {
                viewer: 124435,
                blog: 17,
                link: 1,
                owner_avatar: "http://localhost:7000/images/avatars/admin.png",
            },
        },
    },
    {
        page_id: "4367344",

        owner_id: "20231211133753643",

        layout_id: "1",

        thumbnail: {
            filename: "default.png",
            url: "http://localhost:7000/images/layouts/page-intro-thumbnails/layout_1.png",
        },

        show: {
            name: "NGUYỄN VŨ - SAD THỦ",
            slogan: `Đến là tới - Đụng là chạm!`,
            images: {
                background: {
                    hide: false,
                    filename: "default.png",
                    url: "http://localhost:7000/images/cover-images/default-1.jpg",
                },
                avatar: {
                    hide: false,
                    filename: "admin.png",
                    url: "http://localhost:7000/images/avatars/admin.png",
                },
                cover: [
                    {
                        hide: false,
                        filename: "admin.jpg",
                        url: "http://localhost:7000/images/cover-images/default.jpg",
                    },
                ],
            },
        },

        pageinfo: {
            vertical: false,
            info: {
                star: 9,
                like: 1231,
                cmt: 3463,
                share: 346,
            },
        },

        pageinfocontent: {
            vertical: false,
            info: {
                viewer: 84435,
                blog: 7,
                link: 1,
                owner_avatar: "http://localhost:7000/images/avatars/admin.png",
            },
        },
    },
];

interface Props {
    layout?: LayoutRender;
    dataload?: Page;
}

export default function Comp({ layout }: Props) {
    const layouttmp = layouts[Math.floor(Math.random() * layouts.length)];

    return (
        <Link href={"#"}>
            <Layout layout={layouttmp} />
        </Link>
    );
}

// Layout handler
function Layout({ layout }: any) {
    if (!layout)
        return (
            <Container className="h-100 d-flex align-items-center justify-content-center">
                <h1>Layout none!</h1>
            </Container>
        );

    return <Container className={cx("container")}>{Render(layout)}</Container>;
}

function Render(layout: { items: any[] }) {
    const page = pages[Math.floor(Math.random() * pages.length)];
    return (
        <Row className={cx("row")}>
            {layout.items.map((item, index) => (
                <Col
                    key={index}
                    style={{ ...item?.styles }}
                    xs={{ ...item.colConfig?.xs }}
                    sm={{ ...item.colConfig?.sm }}
                    md={{ ...item.colConfig?.md }}
                    lg={{ ...item.colConfig?.lg }}
                    xl={{ ...item.colConfig?.xl }}
                    xxl={{ ...item.colConfig?.xxl }}
                >
                    {getComponent(item.type, page)}
                </Col>
            ))}
        </Row>
    );
}

function getComponent(type: any, page: Page) {
    switch (type) {
        case "Background":
            return <Background img={page?.show?.images?.background?.url ?? ""} show={!page?.show?.images?.background?.hide} />;

        case "CoverImage":
            return <CoverImage imgs={page?.show?.images?.cover ?? []} />;

        case "Avatar":
            return <Avatar img={page?.show?.images?.avatar?.url ?? ""} size={{ w: 250, h: 250 }} />;

        case "Name":
            return <Name name={page?.show?.name ?? ""} />;

        case "Slogan":
            return <Slogan slogan={page?.show?.slogan ?? ""} />;

        case "PageInfo":
            return <PageInfo vertical={page?.pageinfo?.vertical} info={page?.pageinfo?.info ?? {}} />;

        case "PageInfoContent":
            return <PageInfoContent vertical={page?.pageinfocontent?.vertical} info={page?.pageinfocontent?.info ?? {}} />;

        default:
            return null;
    }
}
