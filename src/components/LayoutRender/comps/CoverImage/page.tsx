import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Image } from "react-bootstrap";
import { ImageStatus } from "../../../../../declares/interfaces";
const cx = classNames.bind(styles);

interface Props {
    imgs: ImageStatus[];
}

export default function Comp({ imgs }: Props) {
    return <Image alt="" className={cx("cover-img")} src={imgs[0]?.url ?? ""} srcSet="" />;
}
