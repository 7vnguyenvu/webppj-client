import classNames from "classnames/bind";
import styles from "./page.module.scss";
const cx = classNames.bind(styles);

interface Props {
    img: string;
}

export default function Comp({ img }: Props) {
    return <img className={cx("cover-img")} src={img} srcSet="" />;
}
