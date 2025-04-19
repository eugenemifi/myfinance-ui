import React from "react";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import {useNavigate} from "react-router";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    login: Yup.string()
        .required("Логин обязателен")
        .min(3, "Минимальная длина логина — 3 символа")
        .max(100, "Максимальная длина логина — 100 символов"),

    password: Yup.string()
        .required("Пароль обязателен")
        .min(8, "Минимальная длина пароля — 8 символов")
        .max(100, "Максимальная длина пароля — 100 символов"),
});

function Login() {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{login: "", password: "", email: ""}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("Поданные данные:", values.login, values.password, values.email);
                navigate("/");
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
                    <button type="submit" className="btn btn-primary">Войти</button>
                </FormikForm>
            )}
        </Formik>
    );
}

export default Login;
