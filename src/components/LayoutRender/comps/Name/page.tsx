import classNames from "classnames/bind";
import styles from "./page.module.scss";
const cx = classNames.bind(styles);

interface Props {
    name: string;
}

export default function Comp({ name }: Props) {
    return <span>{name}</span>;
}
