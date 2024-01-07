"use client";
import Link from "next/link";
import classNames from "classnames/bind";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import styles from "./page.module.scss";
import { Account, User } from "../../../declares/interfaces";
import UserFeature from "./comps/UserFeature/page";
import FormSignIn from "../Forms/Signin/page";
import { FaAngleLeft } from "react-icons/fa6";
import { useGlobalContext } from "@/context/store";
import useAxios from "axios-hooks";
import { AxiosResponse } from "axios";

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
        let isMounted = true;

        const fetchData = async () => {
            try {
                if (!user) {
                    // Perform the asynchronous operation (e.g., API call)
                    const response: AxiosResponse<User | undefined, any> = await userReFetchData();

                    if (isMounted && response && response.data) {
                        // Extract the user data from the Axios response
                        const userData: User = response.data;

                        // Update the state with the extracted user data
                        setUser(userData);
                    }
                }
            } catch (error: any) {
                if (error.name === "AbortError") {
                    // Handle cancellation error (e.g., log or display a message)
                    console.error("Operation was canceled:", error);
                } else {
                    // Handle other errors
                    console.error("An error occurred:", error);
                }
            }
        };

        fetchData();

        return () => {
            // Cleanup function to handle component unmounting
            isMounted = false;
            // Cancel any ongoing operations (if possible)
            // For instance, using AbortController.abort() or CancelToken
        };
    }, [userFetchData]);
    // useEffect(() => {
    //     if (!user) {
    //         userReFetchData();
    //         if (userFetchData) {
    //             setUser(userFetchData);
    //         }
    //     }
    // }, [userFetchData]);

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
