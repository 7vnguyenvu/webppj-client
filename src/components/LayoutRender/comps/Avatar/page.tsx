import classNames from "classnames/bind";
import styles from "./page.module.scss";
const cx = classNames.bind(styles);

interface Props {
    img: string;
    size: {
        w: number;
        h: number;
    };
}

export default function Comp({ img, size }: Props) {
    return <img className={cx("avatar-img")} src={img} width={size?.w} height={size?.h} />;
}
