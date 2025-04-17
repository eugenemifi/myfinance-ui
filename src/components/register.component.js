import React from "react";
import { Formik, Form as FormikForm, Field } from "formik";

function Register() {
    return (
        <Formik
            initialValues={{
                login: "",
                email: "",
                password: "",
            }}
            onSubmit={(values) => {
                console.log("Поданные данные:", values);
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
