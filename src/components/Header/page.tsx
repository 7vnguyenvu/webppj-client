"use client";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import { FaBell } from "react-icons/fa6";

import FormSignIn from "../Forms/Signin/page";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { User } from "../../../declares/interfaces";

const cx = classNames.bind(styles);

export default function Comp() {
    const [user, setUser] = useState<User>();
    const [showForm, setShowForm] = useState(false);
    const [formOut, setFormOut] = useState(false);

    user && console.log(user);

    const handle_ShowForm = () => {
        setShowForm(true);
        setFormOut(false);
    };

    const handle_HideForm = () => {
        setFormOut(true);
        setTimeout(() => {
            setShowForm(false);
        }, 300);
    };

    return (
        <header className={cx("wraper")}>
            <div className={cx("row")}>
                <div className={cx("logo")}>
                    <Link href={"/"}>
                        <img src="/logo-color.png" alt="logo" draggable="false" />
                    </Link>
                    <span className={cx("name-page")}>Trang chủ</span>
                    {/* <span className={cx("name-page")}>Z.Personal</span> */}
                </div>
                <div className={cx("features")}>
                    {user ? (
                        <>
                            <div className={cx("user")}>
                                <div className={cx("avatar")}>
                                    <img src="/logo-color.png" alt="user-avatar" draggable="false" />
                                </div>
                                <span className={cx("lastname")}>{user?.last_name}</span>
                            </div>
                            <div className={cx("notify")}>
                                <FaBell />
                            </div>
                        </>
                    ) : (
                        <Button variant="outline-success" onClick={handle_ShowForm}>
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </div>
            {showForm && (
                <>
                    <div className={cx("overlay", { formOut: formOut })} onClick={handle_HideForm}></div>
                    <FormSignIn setUser={setUser} formOut={formOut} setShowForm={handle_HideForm} />
                </>
            )}
        </header>
    );
}
