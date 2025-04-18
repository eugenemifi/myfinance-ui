import React, {useState} from "react";
import { Formik, Form as FormikForm, Field } from "formik";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router";

function Login() {
    const [loginForm, setLoginForm] = useState('')
    const [passwordForm, setPasswordForm] = useState('')
    const navigate = useNavigate();

    function handleLoginChange(e) {
        setLoginForm(e.target.value);
    }

    function handlePasswordChange(e) {
        setPasswordForm(e.target.value);
    }

    return (
        <Formik
            initialValues={{
                login: "",
                password: "",
            }}
            onSubmit={(values) => {
                console.log("Поданные данные:", loginForm, passwordForm);
                //AuthService.login(values.login, values.password)
                // TODO: add handler (navigate if success and if failure add info message and repeat input
                navigate("/");
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
                    Войти
                </button>
            </FormikForm>
        </Formik>
    );
}
export default Login;
