import React, {useState} from "react";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup"; // Подключили Yup
import AuthService from "../services/auth.service";

const validationSchema = Yup.object().shape({
    login: Yup.string()
        .required("Логин обязателен")
        .min(3, "Минимальная длина логина — 3 символа")
        .max(100, "Максимальная длина логина — 100 символов"),

    email: Yup.string()
        .email("Некорректный адрес электронной почты")
        .required("Email обязателен")
        .max(100, "Максимальная длина адреса — 100 символов"),

    password: Yup.string()
        .required("Пароль обязателен")
        .min(8, "Минимальная длина пароля — 8 символов")
        .max(100, "Максимальная длина пароля — 100 символов"),
});

function Register() {

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    function doRegister(login, email, password) {
        AuthService.register(login, email, password)
            .then((response) => {
                setMessage(response.data);
                setSuccessful(true);
            }).catch(error => {
            if (error.status === 403) {
                setMessage("Логин занят!. Страница перезагрузится автоматически");
            } else {
                setMessage(error.status);
                setSuccessful(false);
            }
            setTimeout(() => window.location.reload(), 3000);
        })
    }

    return (
        <>
            {!successful && !message &&
                <Formik
                    initialValues={{login: "", password: "", email: ""}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        doRegister(values.login, values.email, values.password);
                    }}
                >
                    {({errors, touched}) => (
                        <FormikForm className="container mt-5">
                            <div className="mb-3">
                                <label htmlFor="login" className="form-label">Логин</label>
                                <Field
                                    type="text"
                                    className={`form-control ${errors.login && touched.login ? "is-invalid" : ""}`}
                                    id="login"
                                    name="login"
                                    placeholder="Введите ваш логин"
                                />
                                <ErrorMessage component="div" name="login" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Электронная почта</label>
                                <Field
                                    type="email"
                                    className={`form-control ${errors.email && touched.email ? "is-invalid" : ""}`}
                                    id="email"
                                    name="email"
                                    placeholder="Введите вашу электронную почту"
                                />
                                <ErrorMessage component="div" name="email" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Пароль</label>
                                <Field
                                    type="password"
                                    className={`form-control ${errors.password && touched.password ? "is-invalid" : ""}`}
                                    id="password"
                                    name="password"
                                    placeholder="Введите пароль"
                                />
                                <ErrorMessage component="div" name="password" className="invalid-feedback"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Регистрация</button>
                        </FormikForm>
                    )}
                </Formik>
            }
            {(message && successful) &&
                <div className="form-group">
                    <div> Поздравляем! Вы зарегистрированы</div>
                    <div> Ваш логин: {message.login}</div>
                </div>
            }
            {(message && !successful) &&
                <div className="form-group">
                    <div> Логин занят. Страница автоматически перезагрузится</div>

                </div>
            }
        </>
    )
}

export default Register;