import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup"; // Подключили Yup
import TransactionService from "../services/transaction.service";
import ListTransactions from "./listTransactional.component";
import BanksService from "../services/banks.service";
import TransactionStatusService from "../services/transaction-status.service";
import CategoryService from "../services/category.service";
import TransactionTypesService from "../services/transaction-types.service";

const validationSchema = Yup.object().shape({
    minAmount: Yup.number()
        .positive()
        .required("Сумма обязательный параметр")
        .min(0, "Минимальная сумма 0")
        .max(100000000, "Максимальная сумма 100000000"),

    maxAmount: Yup.number()
        .positive()
        .nullable()
        .min(0, "Минимальная сумма 0")
        .test('is-greater-minAmount', 'Максимальная сумма должна быть больше или равной минимальной', function (maxAmount) {
            const minAmount = this.resolve(Yup.ref('minAmount'))
            if (!minAmount || !maxAmount) return true
            return minAmount <= maxAmount
        }),

    startDate: Yup.date()
        .required("Начальная дата обязательна"),

    endDate: Yup.date()
        .required("Конечная дата обязательна")
        .test('is-before-endDate', 'Конечная дата должна быть позже чем начальная дата', function (endDate) {
            const startDate = this.resolve(Yup.ref('startDate'))
            if (!startDate || !endDate) return true
            return startDate <= endDate
        }),

});

function SearchTransactions() {

    const [isSearchParameters, setSearchParameters] = useState(false);
    const [transactions, setTransactions] = useState(null);
    const [categories, setCategories] = useState([]);
    const [transactionsType, setTransactionType] = useState([]);
    const [transactionsStatus, setTransactionStatus] = useState([]);
    const [banks, setBanks] = useState([]);

    useEffect(() => {
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
        BanksService.getBanks()
            .then((response) => {
                const data = response.data.content;
                setBanks(data);
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
    }, [])

    async function doSearch(senderId, recipientId, startDate, endDate, transStatus,
                            recipientInn, minAmount, maxAmount, transType, category) {
        const response = await TransactionService.searchTransaction(senderId, recipientId, startDate, endDate, transStatus,
           recipientInn, minAmount, maxAmount, transType, category);
        console.log(response);
        setTransactions(response.data);
        setSearchParameters(true);
    }

    return (
        <>
            {!isSearchParameters &&
                <Formik
                    initialValues={{
                        senderId: null,
                        recipientId: null,
                        startDate: "",
                        endDate: "",
                        transStatus: null,
                        recipientInn: "",
                        minAmount: 0,
                        maxAmount: 10000000,
                        transType: null,
                        category: null
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        doSearch(values.senderId, values.recipientId, values.startDate, values.endDate, values.transStatus,
                            values.recipientInn, values.minAmount, values.maxAmount, values.transType, values.category);
                    }}
                >
                    {({errors, touched}) => (
                        <FormikForm className="container mt-5">
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
                                                    className={`form-check-input`}
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
                                                    className={`form-check-input`}
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
                                <label htmlFor="startDate" className="form-label">С какой даты искать</label>
                                <Field
                                    type="date"
                                    className={`form-control ${errors.startDate && touched.startDate ? "is-invalid" : ""}`}
                                    id="startDate"
                                    name="startDate"
                                    placeholder="С какой даты ищем"
                                />
                                <ErrorMessage component="div" name="startDate" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">По какую дату искать</label>
                                <Field
                                    type="date"
                                    className={`form-control ${errors.endDate && touched.endDate ? "is-invalid" : ""}`}
                                    id="endDate"
                                    name="endDate"
                                    placeholder="По какую дату ищем"
                                />
                                <ErrorMessage component="div" name="endDate" className="invalid-feedback"/>
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
                                                    className={`form-check-input`}
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
                                <label htmlFor="minAmount" className="form-label">Минимальная сумма транзакции для
                                    поиска</label>
                                <Field
                                    type="number"
                                    className={`form-control ${errors.minAmount && touched.minAmount ? "is-invalid" : ""}`}
                                    id="minAmount"
                                    name="minAmount"
                                    placeholder="Минимальная сумма"
                                />
                                <ErrorMessage component="div" name="minAmount" className="invalid-feedback"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="maxAmount" className="form-label">Максимальная сумма транзакции для
                                    поиска</label>
                                <Field
                                    type="number"
                                    className={`form-control ${errors.maxAmount && touched.maxAmount ? "is-invalid" : ""}`}
                                    id="maxAmount"
                                    name="maxAmount"
                                    placeholder="Максимальная сумма"
                                />
                                <ErrorMessage component="div" name="maxAmount" className="invalid-feedback"/>
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
                                                    className={`form-check-input`}
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
                                <div id="my-category-group">Категории</div>
                                <ErrorMessage component="div" name="category"
                                              className="btn btn-danger invalid-feedback"/>
                                <div role="group" aria-labelledby="my-category-group">
                                    {categories.map(category =>
                                        <div className="form-check" key={category.id}>
                                            <label className="form-check-label">
                                                <Field
                                                    type="radio"
                                                    className={`form-check-input`}
                                                    name="category"
                                                    value={category.id}
                                                />
                                                {category.categoryName}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Поиск</button>
                        </FormikForm>
                    )}
                </Formik>
            }
            {isSearchParameters && (
                <>
                    <ListTransactions transactions={transactions}/>
                    <button className="btn btn-primary" onClick={() => setSearchParameters(false)}> Новый поиск</button>
                </>
            )}
        </>
    )
}

export default SearchTransactions;