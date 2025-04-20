import React, {useState} from "react";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router";

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

function Login(props) {

    const setUser = props.action;

    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);

    const navigate = useNavigate();

    function doLogin(login, password) {
        AuthService.login(login, password)
            .then((resp) => {
                setSuccessful(true);
                setUser(AuthService.getCurrentUser());
                navigate("/transactions");
            })
            .catch((error) => {
                setSuccessful(false);
                setMessage("Неверная пара логин / пароль. Страница автоматически перезагрузится");
                setTimeout(() => window.location.reload(), 3000);
            });
    }

    return (
        <>
            {(!successful && !message &&
                <Formik
                    initialValues={{login: "", password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        doLogin(values.login, values.password);
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
            )}
            {(message && !successful) &&
                <div className="form-group">
                    <div> {message} </div>
                </div>
            }
        </>
    );
}

export default Login;
