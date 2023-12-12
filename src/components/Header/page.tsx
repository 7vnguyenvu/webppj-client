"use client";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";

import FormSignIn from "../Forms/Signin/page";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { User } from "../../../declares/interfaces";

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;

export default function Comp() {
    const [user, setUser] = useState<User>();
    const [showFormSignin, setShowFormSignin] = useState(false);
    const [formSigninOut, setFormSigninOut] = useState(false);

    user && console.log(user);

    useEffect(() => {
        const item = localStorage.getItem("account");
        let account;

        if (item) {
            account = JSON.parse(item);
            // console.log(account.user_id);
            fetch(`${ServerPath}/users/${account?.user_id}`)
                .then((res) => res.json())
                .then((user) => {
                    console.log(user);
                    setUser(user);
                });
        } else {
            console.log("Chưa đăng nhập!");
        }
    }, []);

    const handle_ShowFormSignin = () => {
        setShowFormSignin(true);
        setFormSigninOut(false);
    };

    const handle_HideFormSignin = () => {
        setFormSigninOut(true);
        setTimeout(() => {
            setShowFormSignin(false);
        }, 300);
    };

    return (
        <header className={cx("wraper")}>
            <div className={cx("row")}>
                <div className={cx("logo")}>
                    <Link href={"/"}>
                        <img src="/logo-color.png" alt="logo" draggable="false" />
                    </Link>
                    <span className={cx("name-page")}>Z.Personal</span>
                </div>
                <div className={cx("features")}>
                    {user ? (
                        <>
                            <div className={cx("user")}>
                                <div className={cx("avatar")}>
                                    <img src="/logo-color.png" alt="user-avatar" draggable="false" />
                                </div>
                                <span className={cx("lastname")}>{user?.info?.last_name}</span>
                            </div>
                            <div className={cx("notify")}>
                                <FaBell />
                            </div>
                        </>
                    ) : (
                        <Button variant="outline-success" onClick={handle_ShowFormSignin}>
                            Đăng nhập
                        </Button>
                    )}
                </div>
            </div>
            {showFormSignin && (
                <>
                    <div className={cx("overlay", { formOut: formSigninOut })} onClick={handle_HideFormSignin}></div>
                    <FormSignIn setUser={setUser} formOut={formSigninOut} setShowForm={handle_HideFormSignin} />
                </>
            )}
        </header>
    );
}
