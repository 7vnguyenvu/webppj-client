import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { FaCommentDots, FaHeart, FaShare, FaStar } from "react-icons/fa6";
import { numberConvert } from "../../../../../services/numconvert";

const cx = classNames.bind(styles);

interface Props {
    vertical?: boolean;
    info: {
        star?: number;
        like?: number;
        cmt?: number;
        share?: number;
    };
}

export default function Comp({ vertical, info }: Props) {
    return (
        <div className={cx("wraper", { vertical: vertical })}>
            {info?.star && (
                <div className={cx("star")}>
                    <FaStar />
                    <span>{numberConvert(info?.star)}</span>
                </div>
            )}
            {info?.like && (
                <div className={cx("like")}>
                    <FaHeart />
                    <span>{numberConvert(info?.like)}</span>
                </div>
            )}
            {info?.cmt && (
                <div className={cx("cmt")}>
                    <FaCommentDots />
                    <span>{numberConvert(info?.cmt)}</span>
                </div>
            )}
            {info?.share && (
                <div className={cx("share")}>
                    <FaShare />
                    <span>{numberConvert(info?.share)}</span>
                </div>
            )}
        </div>
    );
}
