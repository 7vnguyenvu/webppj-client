import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCircleInfo, FaFacebookF, FaGoogle, FaKey, FaUser } from "react-icons/fa6";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { User } from "../../../../declares/interfaces";
import { Button, Image, Toast, ToastContainer } from "react-bootstrap";
import { timePassed } from "../../../../services/timepassed";

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;

interface Props {
    setUser: Dispatch<SetStateAction<User | undefined>>;
    formOut: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}

function Signin({ setUser, formOut, setShowForm }: Props) {
    const [uname, setUName] = useState<string>("");
    const [upass, setUPass] = useState<string>("");
    const [repass, setRePass] = useState<string>("");

    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [previewLastname, setPreviewLastname] = useState<string>("Your Name");

    const [showToast, setShowToast] = useState<boolean>(false);
    const [bkgToast, setBkgToast] = useState<string>("");
    const [titleToast, setTitleToast] = useState<string>("");
    const [messageToast, setMessageToast] = useState<string>("");

    const unameRef = useRef<HTMLInputElement>(null);
    const upassRef = useRef<HTMLInputElement>(null);
    const rePassRef = useRef<HTMLInputElement>(null);

    const Handle_Signin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`${ServerPath}/accounts/signin`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username: uname,
                password: upass,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);

                if (res?.status != 200) {
                    setBkgToast("danger");
                    setTitleToast("Thất bại");
                    setMessageToast(res?.message);
                    setShowToast(true);
                    return;
                }

                if (res?.account) {
                    localStorage.setItem("account", JSON.stringify(res?.account));
                }

                fetch(`${ServerPath}/users/${res?.account?.user_id}`)
                    .then((res) => res.json())
                    .then((user) => {
                        // console.log(user);
                        setUser(user);
                        setShowForm(false);
                    });
            });
    };

    const Handle_Signup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(`${ServerPath}/users/new`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                last_name: previewLastname,
            }),
        })
            .then((res) => res.json())
            .then((user) => {
                fetch(`${ServerPath}/accounts/create`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id: user.user_id,
                        username: uname,
                        password: repass,
                    }),
                })
                    .then((res) => res.json())
                    .then((account) => {
                        setShowForm(false);
                    });
            });
    };

    const Handle_AuthFacebook = () => {
        setBkgToast("dark");
        setTitleToast("Thông báo");
        setMessageToast("Tính năng đang được bảo trì!");
        setShowToast(true);
    };

    const Handle_AuthGoogle = () => {
        setBkgToast("dark");
        setTitleToast("Thông báo");
        setMessageToast("Tính năng đang được bảo trì!");
        setShowToast(true);
    };

    const Validator = () => {
        if (repass !== upass) {
            rePassRef.current?.setCustomValidity("Mật khẩu nhập lại không khớp!");
        } else {
            rePassRef.current?.setCustomValidity("");
        }
    };

    const handleLockspace = (e: { key: string; preventDefault: () => void }) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    return (
        <div className={cx("wraper", { formOut: formOut })}>
            <div className={cx("header", { isSignup: isSignUp })}>
                {!isSignUp ? <p className={cx("header__title")}>Đăng nhập</p> : <p className={cx("header__title")}>Đăng ký tài khoản</p>}
                <span onClick={() => setShowForm(false)}>
                    <FaArrowRight />
                </span>
            </div>

            <ToastContainer className="p-2" position="top-center" style={{ zIndex: 1 }}>
                <Toast className="d-inline-block m-1" bg={bkgToast} onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Header>
                        <Image src="/logo-color.png" width={20} height={20} className="rounded me-2" alt="" />
                        <strong className="me-auto">{titleToast}</strong>
                        <small>{timePassed(new Date())}</small>
                    </Toast.Header>
                    <Toast.Body>{messageToast}</Toast.Body>
                </Toast>
            </ToastContainer>

            <div className={cx("form")}>
                {!isSignUp ? (
                    <>
                        <form className={cx("form__signin")} onSubmit={(e: FormEvent<HTMLFormElement>) => Handle_Signin(e)}>
                            <div className={cx("form__signin-group")}>
                                <label>
                                    <FaUser />
                                    Tên đăng nhập
                                </label>
                                <input
                                    ref={unameRef}
                                    type="text"
                                    placeholder="Username (Max: 20 characters)"
                                    maxLength={20}
                                    onKeyDown={handleLockspace}
                                    onChange={(e) => setUName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={cx("form__signin-group")}>
                                <label>
                                    <FaKey />
                                    Mật khẩu
                                </label>
                                <input
                                    ref={upassRef}
                                    type="password"
                                    placeholder="⁕⁕⁕⁕⁕⁕⁕⁕ (Max: 20 characters)"
                                    maxLength={20}
                                    onKeyDown={handleLockspace}
                                    onChange={(e) => setUPass(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" variant="outline-success">
                                Đăng nhập
                            </Button>
                        </form>

                        <div className={cx("form__other")}>
                            <Button variant="outline-info" onClick={Handle_AuthFacebook}>
                                <FaFacebookF /> <span>Facebook</span>
                            </Button>
                            <Button variant="outline-danger" onClick={Handle_AuthGoogle}>
                                <FaGoogle /> <span>Google</span>
                            </Button>
                        </div>
                    </>
                ) : (
                    <form className={cx("form__signup")} onSubmit={(e: FormEvent<HTMLFormElement>) => Handle_Signup(e)}>
                        <div className={cx("form__signup-group")}>
                            <label>
                                <FaCircleInfo />
                                Tên người dùng
                            </label>
                            <input
                                type="text"
                                placeholder="Lastname (Max: 30 characters)"
                                maxLength={30}
                                onChange={(e) => setPreviewLastname(e.target.value)}
                                required
                            />
                            <div className={cx("preview")}>
                                <div className={cx("preview__cover")}></div>
                                <div className={cx("preview__img")}></div>
                                <span className={cx("preview__name")}>{previewLastname}</span>
                            </div>
                        </div>
                        <div className={cx("form__signin-group")}>
                            <label>
                                <FaUser />
                                Tên đăng nhập
                            </label>
                            <input
                                ref={unameRef}
                                type="text"
                                placeholder="Username (Max: 20 characters)"
                                maxLength={20}
                                onKeyDown={handleLockspace}
                                onChange={(e) => setUName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={cx("form__signin-group")}>
                            <label>
                                <FaKey />
                                Mật khẩu
                            </label>
                            <input
                                ref={upassRef}
                                type="password"
                                placeholder="⁕⁕⁕⁕⁕⁕⁕⁕ (Max: 20 characters)"
                                maxLength={20}
                                onKeyDown={handleLockspace}
                                onChange={(e) => setUPass(e.target.value)}
                                required
                            />
                        </div>
                        <div className={cx("form__signin-group")}>
                            <label>
                                <FaKey />
                                Nhập lại mật khẩu
                            </label>
                            <input
                                ref={rePassRef}
                                type="password"
                                placeholder="⁕⁕⁕⁕⁕⁕⁕⁕ (Max: 20 characters)"
                                maxLength={20}
                                onKeyDown={handleLockspace}
                                onChange={(e) => setRePass(e.target.value)}
                                onKeyUp={Validator}
                                required
                            />
                        </div>
                        <Button type="submit" variant="outline-warning">
                            Đăng ký
                        </Button>
                    </form>
                )}
            </div>
            <div className={cx("footer")}>
                {isSignUp ? (
                    <p>
                        Bạn đã có tài khoản?{" "}
                        <span style={{ color: "#198754" }} onClick={() => setIsSignUp(!isSignUp)}>
                            Đăng nhập
                        </span>
                    </p>
                ) : (
                    <p>
                        Bạn chưa có tài khoản?{" "}
                        <span style={{ color: "#ffc107" }} onClick={() => setIsSignUp(!isSignUp)}>
                            Tạo một tài khoản mới!
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}
export default Signin;
