import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { FaLink, FaNewspaper, FaShare, FaEye } from "react-icons/fa6";
import { numberConvert } from "../../../../../services/numconvert";

const cx = classNames.bind(styles);

interface Props {
    vertical?: boolean;
    info: {
        viewer?: number;
        blog?: number;
        link?: number;
        owner?: string;
    };
}

export default function Comp({ vertical, info }: Props) {
    return (
        <div className={cx("wraper", { vertical: vertical })}>
            {info?.viewer && (
                <div className={cx("viewer")}>
                    <FaEye />
                    <span>{numberConvert(info?.viewer)}</span>
                </div>
            )}
            {info?.blog && (
                <div className={cx("blog")}>
                    <FaNewspaper />
                    <span>{numberConvert(info?.blog)}</span>
                </div>
            )}
            {info?.link && (
                <div className={cx("link")}>
                    <FaLink />
                    <span>{numberConvert(info?.link)}</span>
                </div>
            )}
            {info?.owner && (
                <div className={cx("owner")}>
                    <img src={info?.owner} />
                </div>
            )}
        </div>
    );
}
