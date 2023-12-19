"use client";
import Link from "next/link";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import styles from "./page.module.scss";
import { Account, User } from "../../../declares/interfaces";
import UserFeature from "./comps/UserFeature/page";
import FormSignIn from "../Forms/Signin/page";
import { FaAngleLeft } from "react-icons/fa6";
import { useGlobalContext } from "@/context/store";
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

interface Props {
    namepage?: string;
    isHomePage: boolean;
}

export default function Comp({ namepage, isHomePage }: Props) {
    const { user, setUser } = useGlobalContext();

    const [account, setAccount] = useState<Account | undefined>(getAccount());

    const [{ data: userFetchData, loading: userFetchLoading, error: userFetchError }, userReFetchData] = useAxios<User | undefined>({
        baseURL: ServerPath,
        url: `/users/${account?.user_id}`,
    });

    const [showFormSignin, setShowFormSignin] = useState(false);
    const [formSigninOut, setFormSigninOut] = useState(false);

    useEffect(() => {
        if (!user) {
            userReFetchData();
            if (userFetchData) {
                setUser(userFetchData);
            }
        }
    }, [userFetchData]);

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
            <div className={cx("content")}>
                <div className={cx("logo")}>
                    <Link href={"/"}>
                        <Image src="/logo-color.png" alt="logo" draggable="false" />
                    </Link>
                    <span className={cx("name-page")}>{namepage ?? "Z.Personal"}</span>
                </div>
                {!isHomePage && (
                    <span className={cx("back")} onClick={() => history.back()}>
                        <FaAngleLeft />
                        <p>Trở lại</p>
                    </span>
                )}
                <div className={cx("features")}>
                    {/* {userFetchLoading ? (
                        <Spinner variant="success" animation="border" />
                    ) : user ? (
                        <UserFeature user={user} setUser={setUser} />
                    ) : (
                        <Button variant="outline-success" onClick={handle_ShowFormSignin}>
                            Đăng nhập
                        </Button>
                    )} */}
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
                    <FormSignIn formOut={formSigninOut} setShowForm={handle_HideFormSignin} />
                </>
            )}
        </header>
    );
}
