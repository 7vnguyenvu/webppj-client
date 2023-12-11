import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCircleInfo, FaFacebookF, FaGoogle, FaKey, FaUser } from "react-icons/fa6";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { User } from "../../../../declares/interfaces";
import { Button } from "react-bootstrap";

const cx = classNames.bind(styles);

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
    const [previewLastname, setPreviewLastname] = useState<string>("Last Name");

    const unameRef = useRef<HTMLInputElement>(null);
    const upassRef = useRef<HTMLInputElement>(null);
    const rePassRef = useRef<HTMLInputElement>(null);

    const Handle_Signin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // fetch("http://localhost:7777/users/signin", {
        //     method: "POST",
        //     headers: {
        //         "content-type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         account: uname,
        //         password: upass,
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         if (data?.token) {
        //             localStorage.setItem("access-token", "Bearer " + data?.token);
        //         }

        //         // console.log(data);
        // setUser(data?.user);
        // setUser({ last_name: "Vũ Nguyễn" });
        // setShowForm(false);
        //     });
    };

    const Handle_Signup = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!Validator()) {
            rePassRef.current?.setCustomValidity("Mật khẩu nhập lại không khớp!");
        }
    };

    const Validator = () => {
        if (upass != repass) return false;
        return true;
    };

    const handleLockspace = (e: { key: string; preventDefault: () => void }) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    return (
        <div className={cx("wraper", { formOut: formOut })}>
            <div className={cx("header", { isSignup: isSignUp })}>
                {!isSignUp ? <p className={cx("header__title")}>Đăng nhập</p> : <p className={cx("header__title")}>Đăng ký</p>}
                <span onClick={() => setShowForm(false)}>
                    <FaArrowRight />
                </span>
            </div>

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
                            <Button variant="outline-info">
                                <FaFacebookF /> <span>Facebook</span>
                            </Button>
                            <Button variant="outline-danger">
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
                            Đăng ký
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
}
export default Signin;
