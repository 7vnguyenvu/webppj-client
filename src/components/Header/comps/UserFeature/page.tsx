import Link from "next/link";
import classNames from "classnames/bind";
import { Dispatch, SetStateAction, memo, useRef, useState } from "react";
import { Overlay as ToolTip, Popover, Image } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import styles from "./page.module.scss";
import { User } from "../../../../../declares/interfaces";

interface Props {
    user: User;
    setUser: Dispatch<SetStateAction<User | undefined>>;
}

const cx = classNames.bind(styles);

export default memo(function Comp({ user, setUser }: Props) {
    const userAvatar = user?.images?.avatar?.[0]?.url;
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [targetTooltip, setTargetTooltip] = useState(null);
    const userRef = useRef<HTMLDivElement>(null);

    const handle_ShowTooltip = (e: any) => {
        setShowTooltip(!showTooltip);
        setTargetTooltip(e.target);
    };

    const handle_HideTooltip = () => {
        setShowTooltip(false);
        setTargetTooltip(null);
    };

    let timeoutId: string | number | NodeJS.Timeout | undefined;

    const onMouseOver = () => {
        setShowTooltip(true);
        clearTimeout(timeoutId);
    };

    const onMouseOutDelay = () => {
        timeoutId = setTimeout(() => {
            setShowTooltip(false);
        }, 500);
    };

    const handle_Signout = (e: any) => {
        e.preventDefault();

        localStorage.removeItem("account");
        handle_HideTooltip();

        alert("Đã đăng xuất.");
        setUser(undefined);
    };

    return (
        <>
            <div className={cx("user")} ref={userRef}>
                <div className={cx("avatar")} onClick={handle_ShowTooltip}>
                    <Image src={userAvatar} alt="user-avatar" draggable="false" />
                </div>
                <ToolTip show={showTooltip} target={targetTooltip} placement="bottom" container={userRef} containerPadding={20}>
                    <Popover id="popover-contained" className={cx("user-tooltip")} onMouseOver={onMouseOver} onMouseOut={onMouseOutDelay}>
                        <Popover.Header as="div" className={cx("user-tooltip__header")}>
                            <Link href={`/${user?.info?.nick_name}`} className={cx("user-tooltip__header-container")}>
                                <Image src={userAvatar} alt="avatar" className={cx("user-tooltip__header-container--avatar")} />
                                <div className={cx("user-tooltip__header-container--body")}>
                                    <h4>{user?.info?.full_name}</h4>
                                    <h6>{user?.info?.nick_name}</h6>
                                </div>
                            </Link>
                        </Popover.Header>
                        <Popover.Body className={cx("user-tooltip__body")}>
                            <Link href={`/${user?.info?.nick_name}`} className={cx("item")} onClick={() => {}}>
                                <h6>Trang cá nhân</h6>
                            </Link>
                            <Link href={"#"} className={cx("item")} onClick={() => {}}>
                                <h6>Bài viết của tôi</h6>
                            </Link>
                            <Link href={"#post/edit"} className={cx("item")} onClick={() => {}}>
                                <h6>Tạo bài viết</h6>
                            </Link>
                            <hr />
                            <Link href={"sign-out-now"} className={cx("item")} onClick={handle_Signout}>
                                <h6>Cài đặt</h6>
                            </Link>
                            <hr />
                            <Link href={"sign-out-now"} className={cx("item")} onClick={handle_Signout}>
                                <h6>Đăng xuất</h6>
                            </Link>
                        </Popover.Body>
                    </Popover>
                </ToolTip>
                <span className={cx("lastname")}>{user?.info?.last_name}</span>
            </div>
            <div className={cx("notify")}>
                <FaBell />
            </div>
            <div className={cx("other-link")}>
                <Link href={"#"}>
                    <h6>Trang quảng bá của tôi</h6>
                </Link>
            </div>
        </>
    );
});
