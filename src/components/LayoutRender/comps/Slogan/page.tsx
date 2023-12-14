import classNames from "classnames/bind";
import styles from "./page.module.scss";
const cx = classNames.bind(styles);

interface Props {
    slogan: string;
}

export default function Comp({ slogan }: Props) {
    return <span className={cx("slogan")}>{slogan}</span>;
}
