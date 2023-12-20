import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FaPenNib, FaRegCircleXmark, FaXmark } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Button, Image } from "react-bootstrap";
import { useGlobalContext } from "@/context/store";

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;
const ServerImgBlogs = process.env.NEXT_PUBLIC_SERVER_IMG_BLOGS;
const maxFilesAllowed = 50; // Số lượng tệp tin tối đa cho phép

interface Props {
    formOut: boolean;
    setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function Comp({ formOut, setShowForm }: Props) {
    const { user } = useGlobalContext();

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    // const [image, setImage] = useState<File>();

    // const Handle_UploadImage = () => {

    //     if (!image) {
    //         // setShowForm(false);
    //         console.log("Image undefined!");
    //         return;
    //     }

    //     const formData = new FormData();
    //     image && formData.append("file", image);

    //     fetch(`${ServerPath}/blogs/upload-file`, {
    //         method: "POST",
    //         body: formData,
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // };

    const Handle_UploadImages = () => {
        const formData = new FormData();
        images.forEach((file) => {
            formData.append("files", file);
        });

        fetch(`${ServerPath}/blogs/upload-files`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                if (res) {
                    const thumbnails = res.map((img: { filename: any }) => {
                        return {
                            filename: img.filename,
                            url: `${ServerImgBlogs}/${img.filename}`,
                        };
                    });

                    fetch(`${ServerPath}/blogs/new`, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                        },
                        body: JSON.stringify({
                            owner: {
                                name: user?.info?.full_name,
                                avatar: user?.images?.avatar,
                                page_url: user?.info?.nick_name,
                            },
                            content: {
                                thumbnail: thumbnails,
                                title: title,
                                content: content,
                            },
                        }),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            // console.log(res);
                            return;
                        })
                        .catch((err) => {
                            console.log("Lỗi add blog");
                            console.error(err);
                        });
                }
            })
            .catch((err) => {
                console.log("Lỗi upload files");

                console.error(err);
            });
    };

    // const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.target.files && e.target.files[0];
    //     console.log(selectedFile);
    //     e.target.files && setImage(e.target.files[0]);
    // };

    const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > maxFilesAllowed) {
            alert(`Chỉ chọn tối đa ${maxFilesAllowed} hình ảnh.`);
            e.target.value = ""; // Xóa các tệp tin đã chọn nếu vượt quá giới hạn
        }

        const selectedFiles: File[] = [];
        for (let i = 0; i < files!.length; i++) {
            const file = files![i];
            if (!file.type.startsWith("image/")) {
                alert("Định dạng file không phù hợp!");
                continue;
            }

            selectedFiles.push(file);
        }

        setImages((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const removeImage = (image: File) => {
        setImages((prevImages) => prevImages.filter((img) => img !== image));
    };

    const Handle_AddBlog = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title.trim() === "" && content.trim() === "" && images.length <= 0) {
            setShowForm(false);
            return;
        }

        if (images.length <= 0) {
            setShowForm(false);
            console.log("Images isEmpty!");
            fetch(`${ServerPath}/blogs/new`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    owner: {
                        name: user?.info?.full_name,
                        avatar: user?.images?.avatar,
                        page_url: user?.info?.nick_name,
                    },
                    content: {
                        title: title,
                        content: content,
                    },
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    // console.log(res);
                    return;
                })
                .catch((err) => {
                    console.log("Lỗi add blog");
                    console.error(err);
                });
        }

        if (images.length > 0) {
            setShowForm(false);
            Handle_UploadImages();
        }
    };

    return (
        <div className={cx("wraper", { formOut: formOut })}>
            <div className={cx("header")}>
                <p className={cx("header__title")}>
                    <FaPenNib />
                    Tạo bài viết
                </p>
                <span onClick={() => setShowForm(false)}>
                    <FaXmark />
                </span>
            </div>

            <form className={cx("form")} onSubmit={(e: FormEvent<HTMLFormElement>) => Handle_AddBlog(e)}>
                <div className={cx("form__title")}>
                    <input type="text" placeholder="Tiêu đề" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={cx("form__content")}>
                    <textarea
                        placeholder="Nội dung viết ở đây..."
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                    ></textarea>
                </div>
                <div className={cx("form__preview-image")}>
                    {images.map((file) => (
                        <span key={file.name}>
                            <Image src={URL.createObjectURL(file)} />
                            <span onClick={() => removeImage(file)}>
                                <FaRegCircleXmark />
                            </span>
                        </span>
                    ))}
                    <label htmlFor="inputfiles">
                        <LuImagePlus />
                    </label>
                    {/* <label htmlFor="inputfile">
                        <LuImagePlus />
                    </label> */}
                    {/* {image && (
                        <span>
                            <Image src={URL.createObjectURL(image)} />
                            <span>
                                <FaRegCircleXmark />
                            </span>
                        </span>
                    )} */}
                </div>
                <input hidden id="inputfiles" type="file" accept="image/*" multiple onChange={handleSelectFiles} />
                {/* <input hidden id="inputfile" type="file" accept="image/*" onChange={handleSelectFile} /> */}
                <div className={cx("form__button")}>
                    <Button type="submit" variant="primary">
                        Đăng
                    </Button>
                </div>
            </form>
        </div>
    );
}
