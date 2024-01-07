import classNames from "classnames/bind";
import styles from "./page.module.scss";
import Link from "next/link";
import { Button, Image } from "react-bootstrap";
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
import { Blog } from "../../../../../declares/interfaces";
import { timePassed } from "../../../../../services/timepassed";
import { numberConvert } from "../../../../../services/numconvert";
import { useGlobalContext } from "@/context/store";
import { number } from "yup";
import { memo, SetStateAction, Dispatch, useState } from "react";

interface Props {
    item: Blog;
}

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;

export default memo(function BlogComp({ item }: Props) {
    const { user } = useGlobalContext();
    const [countLike, setCountLike] = useState<number>(item.like ?? 0);
    const [isLiked, setIsLike] = useState<boolean>(false);

    user &&
        fetch(`${ServerPath}/likes/isuser/${user?.user_id}`)
            .then((res) => res.json())
            .then((bol) => {
                setIsLike(bol);
            });

    fetch(`${ServerPath}/likes/blog/${item.blog_id}`)
        .then((res) => res.json())
        .then((like) => {
            setCountLike(like);
        });

    const handle_like = (rid: string | undefined) => {
        if (!user) {
            alert("Hãy đăng nhập!");
            return;
        }

        fetch(`${ServerPath}/likes/blog/${user?.user_id}/${rid}`, { method: "post" })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setCountLike(data.like);
                setIsLike(!isLiked);
            });
    };

    return (
        <div className={cx("blog")}>
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
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    {countLike}
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
                <Button className={cx({ isliked: isLiked })} onClick={() => handle_like(item?.blog_id)}>
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
});
