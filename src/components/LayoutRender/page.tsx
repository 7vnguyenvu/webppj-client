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
import { LayoutRender } from "../../../declares/interfaces";
import Link from "next/link";

const cx = classNames.bind(styles);

// Dummy data
const layouts = [
    {
        id: 1,
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
                    top: "36%",
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
                    padding: ".2rem 4vw",
                    fontSize: "1.7rem",
                    fontWeight: 700,
                    textAlign: "center",
                    width: "auto",
                    height: "auto",
                    position: "absolute",
                    top: "84%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: ".2rem solid #121212",
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
        id: 2,
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
                    top: "10%",
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

interface Props {
    layout?: LayoutRender;
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
                    {getComponent(item.type)}
                </Col>
            ))}
        </Row>
    );
}

function getComponent(type: any) {
    switch (type) {
        case "Background":
            return <Background img={"/cover.jpg"} show={true} />;

        case "CoverImage":
            return <CoverImage img={"/cover.jpg"} />;

        case "Avatar":
            return <Avatar img={"/logo-color.png"} size={{ w: 250, h: 250 }} />;

        case "Name":
            return <Name name="SAD BOY CHÂN CHÍNH" />;

        case "Slogan":
            return (
                <Slogan
                    slogan={`Không phải là MC
            Nên muốn làm Em Sii`}
                />
            );

        case "PageInfo":
            return (
                <PageInfo
                    vertical={false}
                    info={{
                        star: 9.5,
                        like: 7777777,
                        cmt: 12324,
                        share: 9354,
                    }}
                />
            );

        case "PageInfoContent":
            return (
                <PageInfoContent
                    vertical={false}
                    info={{
                        viewer: 9.5,
                        blog: 7777777,
                        link: 12324,
                        owner: "/logo-color.png",
                    }}
                />
            );

        default:
            return null;
    }
}

export default function Comp({ layout }: Props) {
    const layouttmp = layouts[Math.floor(Math.random() * layouts.length)];
    // const layouttmp = layouts[1];

    return (
        <Link href={"#"}>
            <Layout layout={layouttmp} />
        </Link>
    );
}
