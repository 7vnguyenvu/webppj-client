import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Blog, Event, Page } from "../../../declares/interfaces";
import Link from "next/link";
import { Button, Image } from "react-bootstrap";
import { timePassed } from "../../../services/timepassed";
import {
    FaCommentDots,
    FaEllipsisVertical,
    FaEye,
    FaHeart,
    FaRegCommentDots,
    FaRegEye,
    FaRegHeart,
    FaRegShareFromSquare,
    FaShare,
} from "react-icons/fa6";
import { numberConvert } from "../../../services/numconvert";

interface Props {
    type?: string;
    // list: Blog[] | Page[] | Event[];
    list: Blog[];
}

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;

export default function Comp({ type, list }: Props) {
    return (
        <>
            {type == "blogs" &&
                list &&
                list.map((item, index) => {
                    return (
                        <div key={index} className={cx("blog")}>
                            <div className={cx("header")}>
                                <Link href={`/${item?.owner?.page_url}`}>
                                    <Image src={item?.owner?.avatar?.[0]?.url} alt="avatar" className={cx("header__avatar")} />
                                </Link>
                                <div className={cx("header__info")}>
                                    <span className={cx("header__info-name")}>{item?.owner?.name}</span>
                                    <span className={cx("header__info-timepass")}>{timePassed(item?.createdAt)}</span>
                                </div>
                                <div className={cx("header__more")}>
                                    <FaEllipsisVertical />
                                </div>
                            </div>
                            <div className={cx("body")}>
                                {item?.content?.title && <h4 className={cx("title")}>{item?.content?.title}</h4>}
                                {item?.content?.content && <p className={cx("content")}>{item?.content?.content}</p>}
                                {item?.content?.thumbnail?.length !== 0 && (
                                    <div className={cx("thumbnail")}>
                                        {item?.content?.thumbnail?.length === 1 && <Image src={item.content.thumbnail[0].url} alt="" />}

                                        {item?.content?.thumbnail?.length === 2 && (
                                            <div>
                                                <Image src={item.content.thumbnail[0].url} alt="" />
                                                <Image src={item.content.thumbnail[1].url} alt="" />
                                            </div>
                                        )}

                                        {item?.content?.thumbnail?.length === 3 && (
                                            <div>
                                                <Image src={item.content.thumbnail[0].url} alt="" />
                                                <div>
                                                    <Image src={item.content.thumbnail[1].url} alt="" />
                                                    <Image src={item.content.thumbnail[2].url} alt="" />
                                                </div>
                                            </div>
                                        )}

                                        {item?.content?.thumbnail?.length === 4 && (
                                            <div>
                                                <div>
                                                    <Image src={item.content.thumbnail[0].url} alt="" />
                                                    <Image src={item.content.thumbnail[1].url} alt="" />
                                                </div>
                                                <div>
                                                    <Image src={item.content.thumbnail[2].url} alt="" />
                                                    <Image src={item.content.thumbnail[3].url} alt="" />
                                                </div>
                                            </div>
                                        )}

                                        {item?.content?.thumbnail?.length && item?.content?.thumbnail?.length > 4 && (
                                            <div>
                                                <div>
                                                    <Image src={item.content.thumbnail[0].url} alt="" />
                                                    <Image src={item.content.thumbnail[1].url} alt="" />
                                                </div>
                                                <div>
                                                    <Image src={item.content.thumbnail[2].url} alt="" />
                                                    <Image src={item.content.thumbnail[3].url} alt="" />
                                                    <span className={cx("overlay")}>+ {item?.content?.thumbnail?.length - 4}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={cx("interact")}>
                                <div>
                                    <FaRegHeart />
                                    {item?.like}
                                </div>
                                <div>
                                    <div>
                                        <FaRegCommentDots />
                                        {item?.comment}
                                    </div>
                                    <div>
                                        <FaRegShareFromSquare />
                                        {item?.share}
                                    </div>
                                    <div>
                                        <FaRegEye />
                                        {item?.view && numberConvert(item?.view)}
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
                    );
                })}

            {type == "pages" &&
                list &&
                list.map((item, index) => (
                    <div key={index} className={cx("blog")}>
                        <div className={cx("header")}>
                            <Link href={`/${item?.owner?.page_url}`}>
                                <Image src={item?.owner?.avatar?.[0]?.url} alt="avatar" className={cx("header__avatar")} />
                            </Link>
                            <div className={cx("header__info")}>
                                <span className={cx("header__info-name")}>{item?.owner?.name}</span>
                                <span className={cx("header__info-timepass")}>{timePassed(item?.createdAt)}</span>
                            </div>
                            <div className={cx("header__more")}>
                                <FaEllipsisVertical />
                            </div>
                        </div>
                        <div className={cx("body")}>
                            <p className={cx("title")}>{item?.content?.title}</p>
                            <p className={cx("content")}>{item?.content?.content}</p>
                            {item?.content?.thumbnail?.length !== 0 && (
                                <div className={cx("thumbnail")}>
                                    {item?.content?.thumbnail?.length === 1 && <Image src={item.content.thumbnail[0].url} alt="" />}

                                    {item?.content?.thumbnail?.length === 2 && (
                                        <div>
                                            <Image src={item.content.thumbnail[0].url} alt="" />
                                            <Image src={item.content.thumbnail[1].url} alt="" />
                                        </div>
                                    )}

                                    {item?.content?.thumbnail?.length === 3 && (
                                        <div>
                                            <Image src={item.content.thumbnail[0].url} alt="" />
                                            <div>
                                                <Image src={item.content.thumbnail[1].url} alt="" />
                                                <Image src={item.content.thumbnail[2].url} alt="" />
                                            </div>
                                        </div>
                                    )}

                                    {item?.content?.thumbnail?.length === 4 && (
                                        <div>
                                            <div>
                                                <Image src={item.content.thumbnail[0].url} alt="" />
                                                <Image src={item.content.thumbnail[1].url} alt="" />
                                            </div>
                                            <div>
                                                <Image src={item.content.thumbnail[2].url} alt="" />
                                                <Image src={item.content.thumbnail[3].url} alt="" />
                                            </div>
                                        </div>
                                    )}

                                    {item?.content?.thumbnail?.length && item?.content?.thumbnail?.length > 4 && (
                                        <div>
                                            <div>
                                                <Image src={item.content.thumbnail[0].url} alt="" />
                                                <Image src={item.content.thumbnail[1].url} alt="" />
                                            </div>
                                            <div>
                                                <Image src={item.content.thumbnail[2].url} alt="" />
                                                <Image src={item.content.thumbnail[3].url} alt="" />
                                                <span className={cx("overlay")}>+ {item?.content?.thumbnail?.length - 4}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={cx("footer")}>
                            <div className={cx("like")}>
                                <FaRegHeart />
                                {item?.like}
                            </div>
                            <div className={cx("comment")}>
                                <FaCommentDots />
                                {item?.comment}
                            </div>
                            <div className={cx("share")}>
                                <FaShare />
                                {item?.share}
                            </div>
                            <div className={cx("view")}>
                                <FaEye />
                                {item?.view && numberConvert(item?.view)}
                            </div>
                        </div>
                    </div>
                ))}

            {type == "events" &&
                list &&
                list.map((item, index) => (
                    <div key={index} className={cx("blog")}>
                        <div className={cx("header")}>
                            <Link href={`/${item?.owner?.page_url}`}>
                                <Image src={item?.owner?.avatar?.[0]?.url} alt="avatar" className={cx("header__avatar")} />
                            </Link>
                            <div className={cx("header__info")}>
                                <span className={cx("header__info-name")}>{item?.owner?.name}</span>
                                <span className={cx("header__info-timepass")}>{timePassed(item?.createdAt)}</span>
                            </div>
                            <div className={cx("header__more")}>
                                <FaEllipsisVertical />
                            </div>
                        </div>
                        <div className={cx("body")}>
                            <h4 className={cx("title")}>{item?.content?.title}</h4>
                            <p className={cx("content")}>{item?.content?.content}</p>
                            {item?.content?.thumbnail?.length !== 0 && (
                                <div className={cx("thumbnail")}>
                                    {item?.content?.thumbnail?.length === 1 && <Image src={item.content.thumbnail[0].url} alt="" />}

                                    {item?.content?.thumbnail?.length === 2 && (
                                        <div>
                                            <Image src={item.content.thumbnail[0].url} alt="" />
                                            <Image src={item.content.thumbnail[1].url} alt="" />
                                        </div>
                                    )}

                                    {item?.content?.thumbnail?.length === 3 && (
                                        <div>
                                            <Image src={item.content.thumbnail[0].url} alt="" />
                                            <div>
                                                <Image src={item.content.thumbnail[1].url} alt="" />
                                                <Image src={item.content.thumbnail[2].url} alt="" />
                                            </div>
                                        </div>
                                    )}

                                    {item?.content?.thumbnail?.length === 4 && (
                                        <div>
                                            <div>
                                                <Image src={item.content.thumbnail[0].url} alt="" />
                                                <Image src={item.content.thumbnail[1].url} alt="" />
                                            </div>
                                            <div>
                                                <Image src={item.content.thumbnail[2].url} alt="" />
                                                <Image src={item.content.thumbnail[3].url} alt="" />
                                            </div>
                                        </div>
                                    )}

                                    {item?.content?.thumbnail?.length && item?.content?.thumbnail?.length > 4 && (
                                        <div>
                                            <div>
                                                <Image src={item.content.thumbnail[0].url} alt="" />
                                                <Image src={item.content.thumbnail[1].url} alt="" />
                                            </div>
                                            <div>
                                                <Image src={item.content.thumbnail[2].url} alt="" />
                                                <Image src={item.content.thumbnail[3].url} alt="" />
                                                <span className={cx("overlay")}>+ {item?.content?.thumbnail?.length - 4}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={cx("footer")}>
                            <div className={cx("like")}>
                                <FaRegHeart />
                                {item?.like}
                            </div>
                            <div className={cx("comment")}>
                                <FaCommentDots />
                                {item?.comment}
                            </div>
                            <div className={cx("share")}>
                                <FaShare />
                                {item?.share}
                            </div>
                            <div className={cx("view")}>
                                <FaEye />
                                {item?.view && numberConvert(item?.view)}
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}
