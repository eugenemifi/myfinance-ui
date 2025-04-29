import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup"; // Подключили Yup
import AuthService from "../services/auth.service";
import CategoryService from "../services/category.service";
import TransactionTypesService from "../services/transaction-types.service";
import TransactionStatusService from "../services/transaction-status.service";
import BanksService from "../services/banks.service";
import TransactionService from "../services/transaction.service";

const validationSchema = Yup.object().shape({
    amount: Yup.number()
        .positive()
        .required("Сумма обязательный параметр")
        .min(0, "Минимальная сумма 0")
        .max(100000000, "Максимальная сумма 100000000"),

    category: Yup.string()
        .required("Категория обязательна!!!"),

    transType: Yup.string()
        .required("Тип транзакции обязателен!!!"),

    transStatus: Yup.string()
        .required("Статус транзакции обязателен!!!"),

    senderId: Yup.string()
        .required("Банк отправитель обязателен!!!"),

    recipientId: Yup.string()
        .required("Банк получатель обязателен!!!"),

    recipientInn: Yup.string()
        .required("ИНН обязательный параметр")
        .matches(/^\d{11}$/, {
            message: "ИНН должен содержать 11 цифр",
            excludeEmptyString: true
        }),

    recipientBankAccount: Yup.string()
        .matches(/^\d{20}$/, {
            message: "Счёт получателя должен содержать ровно 20 цифр",
            excludeEmptyString: true,
        })
        .required("Счёт получателя обязательный параметр"),

    phoneNumber: Yup.string()
        .matches(
            /^(\+[78]\d{10}|[78]\d{10})$/,
            "Номер телефона должен быть в формате +7XXXXXXXXXX, 7XXXXXXXXXX или 8XXXXXXXXXX"
        )
        .required("Телефон обязательно нужно заполнить!"),

    date: Yup.date()
        .required("Дата транзакции обязательна"),

    comment: Yup.string()
        .required("Комментарий обязателен!")
        .min(1, "Минимальная длина комментария - 1 символ")
        .max(500, "Максимальная длина комментария - 500 символов"),
});

function CreateTransactions({id}) {

    const [isCreated, setIsCreated] = useState(false)
    const [transact, setTransact] = useState([])

    const [categories, setCategories] = useState([]);
    const [transactionsType, setTransactionType] = useState([]);
    const [transactionsStatus, setTransactionStatus] = useState([]);
    const [banks, setBanks] = useState([]);
    const [existsTransaction, setExistsTransaction] = useState([])
    const [datatime, setDatatime] = useState(new Date().toISOString().slice(0, 11) + new Date().toLocaleString().slice(-8, -3))

    useEffect(() => {
        if (id) {
            TransactionService.getTransactionById(id).then(
                response => {
                    setExistsTransaction(response.data)
                    setDatatime(new Date(response.data.createdAt).toISOString().slice(0, -8));
                    console.log(response.data)
                }
            )
        }
        CategoryService.getCategories()
            .then((response) => {
                const data = response.data;
                setCategories(data);
            })
            .catch((error) => {
                console.log(error);
            })
        TransactionTypesService.getTransactionTypes()
            .then((response) => {
                const data = response.data;
                setTransactionType(data);
            })
            .catch((error) => {
                console.log(error);
            })
        TransactionStatusService.getTransactionStatuses()
            .then((response) => {
                const data = response.data;
                setTransactionStatus(data);
            })
            .catch((error) => {
                console.log(error);
            })
        BanksService.getBanks()
            .then((response) => {
                const data = response.data;
                setBanks(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    async function doCreate(amount, categoryId, transactionTypeId, transactionStatusId, senderId, recipientId,
                            recipientInn, recipientBankAccount, phoneNumber, date, comment) {
        const time = Date.parse(date);
        const user = {userId: AuthService.getCurrentUserId()};
        const transactionType = {id: transactionTypeId};
        const transactionStatus = {id: transactionStatusId};
        const category = {id: categoryId};
        const senderBank = {bankId: senderId};
        const recipientBank = {bankId: recipientId};
        const data = {
            id: "",
            user: user,
            transactionType: transactionType,
            transactionStatus: transactionStatus,
            category: category,
            transactionDateTime: time,
            comment: comment,
            amount: amount,
            senderBank: senderBank,
            recipientBank: recipientBank,
            recipientInn: recipientInn,
            recipientBankAccount: recipientBankAccount,
            recipientPhone: phoneNumber,
            createdAt: time,
            updatedAt: time
        }
        TransactionService.createTransaction(data).then(response => {
            setIsCreated(true);
            setTransact(response.data)
        }).catch(error => console.log(error))
    }

    async function doUpdate(amount, categoryId, transactionTypeId, transactionStatusId, senderId, recipientId,
                            recipientInn, recipientBankAccount, phoneNumber, date, comment) {
        const time = Date.parse(date);
        const user = {userId: AuthService.getCurrentUserId()};
        const transactionType = {id: transactionTypeId};
        const transactionStatus = {id: transactionStatusId};
        const category = {id: categoryId};
        const senderBank = {bankId: senderId};
        const recipientBank = {bankId: recipientId};
        const data = {
            id: existsTransaction.id,
            user: user,
            transactionType: transactionType,
            transactionStatus: transactionStatus,
            category: category,
            transactionDateTime: time,
            comment: comment,
            amount: amount,
            senderBank: senderBank,
            recipientBank: recipientBank,
            recipientInn: recipientInn,
            recipientBankAccount: recipientBankAccount,
            recipientPhone: phoneNumber,
            createdAt: time,
            updatedAt: Date.parse(new Date().toISOString().slice(0, 11) + new Date().toLocaleString().slice(-8, -3))
        }
        TransactionService.updateTransaction(data).then(response => {
            setIsCreated(true);
            setTransact(response.data)
        }).catch(error => console.log(error))
    }

    return (
        <>
            {!isCreated &&
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        amount: existsTransaction?.amount || 0,
                        category: existsTransaction?.category?.id || "",
                        transType: existsTransaction?.transactionType?.id || "",
                        transStatus: existsTransaction?.transactionStatus?.id || "",
                        senderId: existsTransaction?.senderBank?.bankId || "",
                        recipientId: existsTransaction?.recipientBank?.bankId || "",
                        recipientInn: existsTransaction?.recipientInn || 12345678987,
                        recipientBankAccount: existsTransaction?.recipientBankAccount || "",
                        phoneNumber: existsTransaction?.recipientPhone || "",
                        date: datatime || "",
                        comment: existsTransaction?.comment || ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        existsTransaction ?
                            doUpdate(values.amount, values.category, values.transType, values.transStatus, values.senderId,
                                values.recipientId, values.recipientInn, values.recipientBankAccount, values.phoneNumber,
                                values.date, values.comment)
                            :
                            doCreate(values.amount, values.category, values.transType, values.transStatus, values.senderId,
                                values.recipientId, values.recipientInn, values.recipientBankAccount, values.phoneNumber,
                                values.date, values.comment)
                    }}
                >
                    {({errors, touched}) => (
                        <FormikForm className="container mt-5">
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">Сумма транзакции</label>
                                <Field
                                    type="number"
                                    className={`form-control ${errors.amount && touched.amount ? "is-invalid" : ""}`}
                                    id="amount"
                                    name="amount"
                                    placeholder="Сумма транзакции"
                                />
                                <ErrorMessage component="div" name="amount" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <div id="my-category-group">Категории</div>
                                <ErrorMessage component="div" name="category"
                                              className="btn btn-danger invalid-feedback"/>
                                <div role="group" aria-labelledby="my-category-group">
                                    {categories.map(category =>
                                        <div className="form-check" key={category.id}>
                                            <label className="form-check-label">
                                                <Field
                                                    type="radio"
                                                    className={`form-check-input ${errors.category && touched.category ? "is-invalid" : ""}`}
                                                    name="category"
                                                    value={category.id}
                                                />
                                                {category.categoryName}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <div id="my-category-group">Тип транзакции</div>
                                <ErrorMessage component="div" name="transType"
                                              className="btn btn-danger invalid-feedback"/>
                                <div role="group" aria-labelledby="my-category-group">
                                    {transactionsType.map(transType =>
                                        <div className="form-check" key={transType.id}>
                                            <label className="form-check-label">
                                                <Field
                                                    type="radio"
                                                    className={`form-check-input ${errors.transType && touched.transType ? "is-invalid" : ""}`}
                                                    name="transType"
                                                    value={transType.id}
                                                />
                                                {transType.name}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <div id="my-category-group">Статус транзакции</div>
                                <ErrorMessage component="div" name="transStatus"
                                              className="btn btn-danger invalid-feedback"/>
                                <div role="group" aria-labelledby="my-category-group">
                                    {transactionsStatus.map(transStatus =>
                                        <div className="form-check" key={transStatus.id}>
                                            <label className="form-check-label">
                                                <Field
                                                    type="radio"
                                                    className={`form-check-input ${errors.transStatus && touched.transStatus ? "is-invalid" : ""}`}
                                                    name="transStatus"
                                                    value={transStatus.id}
                                                />
                                                {transStatus.status}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <div id="my-category-group">Банк отправитель</div>
                                <ErrorMessage component="div" name="senderId"
                                              className="btn btn-danger invalid-feedback"/>
                                <div role="group" aria-labelledby="my-category-group">
                                    {banks.map(bank =>
                                        <div className="form-check" key={bank.bankId}>
                                            <label className="form-check-label">
                                                <Field
                                                    type="radio"
                                                    className={`form-check-input ${errors.senderId && touched.senderId ? "is-invalid" : ""}`}
                                                    name="senderId"
                                                    value={bank.bankId}
                                                />
                                                {bank.bankName}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <div id="my-category-group">Банк получатель</div>
                                <ErrorMessage component="div" name="recipientId"
                                              className="btn btn-danger invalid-feedback"/>
                                <div role="group" aria-labelledby="my-category-group">
                                    {banks.map(bank =>
                                        <div className="form-check" key={bank.bankId}>
                                            <label className="form-check-label">
                                                <Field
                                                    type="radio"
                                                    className={`form-check-input ${errors.recipientId && touched.recipientId ? "is-invalid" : ""}`}
                                                    name="recipientId"
                                                    value={bank.bankId}
                                                />
                                                {bank.bankName}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipientInn" className="form-label">ИНН получателя</label>
                                <Field
                                    type="text"
                                    className={`form-control ${errors.recipientInn && touched.recipientInn ? "is-invalid" : ""}`}
                                    id="recipientInn"
                                    name="recipientInn"
                                    placeholder="ИИН человека которому переводим деньги"
                                />
                                <ErrorMessage component="div" name="recipientInn" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="recipientBankAccount" className="form-label">Счет получателя</label>
                                <Field
                                    type="text"
                                    className={`form-control ${errors.recipientBankAccount && touched.recipientBankAccount ? "is-invalid" : ""}`}
                                    id="recipientBankAccount"
                                    name="recipientBankAccount"
                                    placeholder="Счет получателя. Должен состоять из 20 цифр"
                                />
                                <ErrorMessage component="div" name="recipientBankAccount" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Телефон получателя</label>
                                <Field
                                    type="tel"
                                    className={`form-control ${errors.phoneNumber && touched.phoneNumber ? "is-invalid" : ""}`}
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="+7(XXX)XXX-XX-XX"
                                />
                                <ErrorMessage component="div" name="phoneNumber" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Дата транзакции</label>
                                <Field
                                    type="datetime-local"
                                    className={`form-control ${errors.date && touched.date ? "is-invalid" : ""}`}
                                    id="date"
                                    name="date"
                                    placeholder="Дата совершения транзакции"
                                />
                                <ErrorMessage component="div" name="date" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="comment" className="form-label">Комментарий для транзакции</label>
                                <Field
                                    type="text"
                                    className={`form-control ${errors.comment && touched.comment ? "is-invalid" : ""}`}
                                    id="comment"
                                    name="comment"
                                    placeholder="Комментарий для транзакции"
                                />
                                <ErrorMessage component="div" name="comment" className="invalid-feedback"/>
                            </div>
                            {existsTransaction ?
                                <button type="submit" className="btn btn-primary">Обновить транзакцию</button>
                                :
                                <button type="submit" className="btn btn-primary">Создать транзакцию</button>
                            }
                        </FormikForm>
                    )}
                </Formik>
            }
            {isCreated &&
                <>
                    <div>Транзакция создана</div>
                    <div>{JSON.stringify(transact)}</div>
                    <button className="btn btn-primary" onClick={() => setIsCreated(false)}> Создать новую транзакцию
                    </button>
                </>
            }
        </>
    )
}

export default CreateTransactions;