import classNames from "classnames/bind";
import styles from "./page.module.scss";
const cx = classNames.bind(styles);

interface Props {
    img: string;
    show: boolean;
}

export default function Comp({ img, show }: Props) {
    return show ? <img className={cx("background-img")} src={img} /> : <></>;
}
