import React, {useState} from "react";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup"; // Подключили Yup
import TransactionService from "../services/transaction.service";
import ListTransactions from "./listTransactional.component";

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
        })
});

function SearchTransactions() {

    const [isSearchParameters, setSearchParameters] = useState(false);
    const [transactions, setTransactions] = useState(null);

    async function doSearch(minAmount, maxAmount, startDate, endDate, category) {
        const response = await TransactionService.searchTransaction(minAmount, maxAmount, startDate, endDate, category);
        console.log(response);
        setTransactions(response.data);
        setSearchParameters(true);
    }

    return (
        <>
            {!isSearchParameters &&
                <Formik
                    initialValues={{minAmount: 0, maxAmount: 10000000, startDate: "", endDate: "", category: "Зарплата"}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        doSearch(values.minAmount, values.maxAmount, values.startDate, values.endDate, values.category);
                    }}
                >
                    {({errors, touched}) => (
                        <FormikForm className="container mt-5">
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
                                <div id="my-category-group">Категории</div>
                                <div role="group" aria-labelledby="my-category-group">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field type="radio" className="form-check-input" name="category"
                                                   value="Зарплата"/>
                                            Зарплата
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field type="radio" className="form-check-input" name="category"
                                                   value="Продажа"/>
                                            Продажа
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field type="radio" className="form-check-input" name="category"
                                                   value="Покупка"/>
                                            Покупка
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field type="radio" className="form-check-input" name="category"
                                                   value="Офисные расходы"/>
                                            Офисные расходы
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Field type="radio" className="form-check-input" name="category"
                                                   value="Маркетинг"/>
                                            Маркетинг
                                        </label>
                                    </div>
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