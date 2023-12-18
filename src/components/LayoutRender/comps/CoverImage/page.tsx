import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Image } from "react-bootstrap";
const cx = classNames.bind(styles);

interface Props {
    img: string;
}

export default function Comp({ img }: Props) {
    return <Image alt="" className={cx("cover-img")} src={img} srcSet="" />;
}
