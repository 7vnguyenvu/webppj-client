"use client";
import Link from "next/link";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Button, Overlay as ToolTip, Popover } from "react-bootstrap";
import { FaBell } from "react-icons/fa6";
import styles from "./page.module.scss";
import { Account, User } from "../../../declares/interfaces";
import UserFeature from "./comps/UserFeature/page";
import FormSignIn from "../Forms/Signin/page";
import useAxios from "axios-hooks";

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;

const getAccount = () => {
    if (typeof window !== "undefined") {
        const item = localStorage.getItem("account");
        if (!item) return undefined;
        return JSON.parse(item);
    }
};

export default function Comp() {
    const [account, setAccount] = useState<Account | undefined>(getAccount());

    const [{ data, loading, error }, refetch] = useAxios<User | undefined>({
        baseURL: ServerPath, // Link server
        url: `/users/${account?.user_id}`, // path param, post payload, ...
    });

    const [user, setUser] = useState<User | undefined>(undefined);
    const [showFormSignin, setShowFormSignin] = useState(false);
    const [formSigninOut, setFormSigninOut] = useState(false);

    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [targetTooltip, setTargetTooltip] = useState(null);
    const userRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (error) {
            // console.log(error);
        }
        if (data) {
            // console.log(data);
            setUser(data);
        }
    }, [account, data, error]);

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

    const handle_Signout = (e: any) => {
        e.preventDefault();

        localStorage.removeItem("account");
        handle_HideTooltip();

        alert("Đã đăng xuất.");
        setUser(undefined);
    };

    return (
        <header className={cx("wraper")}>
            <div className={cx("content")}>
                <div className={cx("logo")}>
                    <Link href={"/"}>
                        <img src="/logo-color.png" alt="logo" draggable="false" />
                    </Link>
                    <span className={cx("name-page")}>Z.Personal</span>
                </div>
                <div className={cx("features")}>
                    {user ? (
                        <UserFeature user={user} setUser={setUser} />
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
