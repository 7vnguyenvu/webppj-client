import classNames from "classnames/bind";
import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function Home() {
    return (
        <main className={cx("wraper")}>
            <h1>MAIN</h1>
            <img src="/logo-color.png" alt="" />
        </main>
    );
}
