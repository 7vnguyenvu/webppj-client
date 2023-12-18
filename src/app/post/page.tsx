"use client";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";

import { Container } from "react-bootstrap";

const cx = classNames.bind(styles);
const ServerPath = process.env.NEXT_PUBLIC_SERVER_API;

const editorConfiguration = {
    placeholder: "Nội dung viết ở đây...",

    toolbar: [
        "heading",
        "|",
        "bold",
        "italic",
        "strikethrough",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "alignment",
        "|",
        "blockQuote",
        "code",
        "codeblock",
        "|",
        "undo",
        "redo",
    ],
};

export default function Comp() {
    const [editorData, setEditorData] = useState<string>("");

    const { Formik } = formik;

    const schema = yup.object().shape({
        title: yup.string(),
        content: yup.string().required(),
    });

    return (
        <main className={cx("wraper")}>
            <Container>
                <Formik
                    validationSchema={schema}
                    onSubmit={console.log}
                    initialValues={{
                        title: "",
                        content: "",
                    }}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row className="mt-3">
                                <Form.Group as={Col} controlId="validationFormik01" className={cx("title")}>
                                    <Form.Control type="text" placeholder="Tiêu đề" name="title" value={values.title} onChange={handleChange} />
                                </Form.Group>
                                <Form.Group as={Col} className={cx("submit")}>
                                    <Button variant="success" type="submit">
                                        Đăng bài
                                    </Button>
                                </Form.Group>
                            </Row>
                            <hr />
                            <Row className="mt-3">
                                <Form.Group as={Col} md={12} controlId="validationFormik03">
                                    <Form.Control
                                        hidden={true}
                                        type="text"
                                        name="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        isInvalid={!!errors.content}
                                    />
                                    <div className={cx("content")}>
                                        <CKEditor
                                            editor={Editor}
                                            config={editorConfiguration}
                                            data={editorData}
                                            onReady={(editor) => {
                                                editor.editing.view.change((writer) => {
                                                    const root = editor.editing.view.document.getRoot();
                                                    if (root) {
                                                        writer.setStyle("height", "auto", root);
                                                    }
                                                });
                                            }}
                                            onChange={(event, editor) => {
                                                // const data = editor.getData();
                                                // console.log({ event, editor, data });
                                                setEditorData(editor.getData());
                                            }}
                                        />
                                    </div>

                                    <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Container>
        </main>
    );
}
