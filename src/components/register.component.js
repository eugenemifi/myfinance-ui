import React, {useState} from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router";

function Register() {

    const [loginForm, setLoginForm] = useState('')
    const [passwordForm, setPasswordForm] = useState('')
    const [emailForm, setEmailForm] = useState('')
    const navigate = useNavigate();

    function handleLoginChange(e) {
        setLoginForm(e.target.value);
    }

    function handlePasswordChange(e) {
        setPasswordForm(e.target.value);
    }

    function handleEmailChange(e) {
        setEmailForm(e.target.value);
    }

    return (
        <Formik
            initialValues={{
                login: "",
                email: "",
                password: "",
            }}
            onSubmit={(values) => {
                console.log("Поданные данные:", loginForm, passwordForm, emailForm);
                //AuthService.register(values.username, values.email, values.password);
                navigate("/home");
            }}
        >
            <FormikForm className="container mt-5">
                <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                        Логин
                    </label>
                    <Field
                        type="login"
                        className="form-control"
                        id="login"
                        name="login"
                        placeholder="Введите ваш логин"
                        value = {loginForm}
                        onChange = {handleLoginChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Электронная почта
                    </label>
                    <Field
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Введите вашу электронную почту"
                        value = {emailForm}
                        onChange = {handleEmailChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Пароль
                    </label>
                    <Field
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Введите пароль"
                        value = {passwordForm}
                        onChange = {handlePasswordChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Регистрация
                </button>
            </FormikForm>
        </Formik>
    );
}
export default Register;
