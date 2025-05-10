import {Link, useNavigate} from "react-router";
import AuthService from "../services/auth.service";
import {useState} from "react";
import TransactionService from "../services/transaction.service";

function ListTransactions({transactions}) {

    const [currentUser] = useState(AuthService.getCurrentUser);
    const navigate = useNavigate();
    const goto = () => {
        navigate("/create-trans");
    }

    const deleteTransaction = (uuid) => {
        TransactionService.deleteTransaction(uuid);
    }

    const getWeekFromField = (field) => {
        let date = new Date(field);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 4 - (date.getDay() || 7));
        let firstJan = new Date(date.getFullYear(), 0, 1);
        return Math.ceil(((date - firstJan) / 86400000 + 1) / 7);
    };

    const getQuarterFromField = (field) => {
        return Math.ceil((new Date(field).getMonth() + 1) / 3);
    }
    const getYearFromField = (field) => new Date(field).getFullYear();

    const groupByWeek = (data) => {
        return data.reduce((acc, item) => {
            const weekNumber = getWeekFromField(item.transactionDateTime);
            acc[weekNumber] = [...(acc[weekNumber] || []), item];
            return acc;
        }, {});
    };

    const getMonthIndex = (monthName) => {
        const months = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"]
        return months.indexOf(monthName.toUpperCase());
    };

    const getMonthByIndex = (index) => {
        const months = ["ЯНВАРЬ", "ФЕВРАЛЬ", "МАРТ", "АПРЕЛЬ", "МАЙ", "ИЮНЬ", "ИЮЛЬ", "АВГУСТ", "СЕНТЯБРЬ", "ОКТЯБРЬ", "НОЯБРЬ", "ДЕКАБРЬ"]
        return months[index];
    };
    const groupByMonth = (data) => {
        const groupedData = data.reduce((acc, item) => {
            const monthNumber = new Date(item.transactionDateTime).getMonth();
            const monthName = getMonthByIndex(monthNumber);
            acc[monthName] = [...(acc[monthName] || []), item];
            return acc;
        }, {});

        const monthsList = Object.keys(groupedData);
        monthsList.sort((a, b) => getMonthIndex(a) - getMonthIndex(b));

        return monthsList.reduce((sortedAcc, key) => {
            sortedAcc[key] = groupedData[key];
            return sortedAcc;
        }, {});
    };

    const groupByQuarter = (data) => {
        return data.reduce((acc, item) => {
            const quarter = getQuarterFromField(item.transactionDateTime);
            acc[quarter] = [...(acc[quarter] || []), item];
            return acc;
        }, {});
    };

    const groupByYear = (data) => {
        return data.reduce((acc, item) => {
            const year = getYearFromField(item.transactionDateTime);
            acc[year] = [...(acc[year] || []), item];
            return acc;
        }, {});
    };

    const getStatByPeriod = (data) => {
        let statistics = {}
        let totalIncome = 0;
        let totalExpense = 0;
        let incomeGroup = {}
        let responseGroup = {}
        let transTypes = {}

        console.log("Big data", data)
        for (let i = 0; i < data.length; i++) {
            let transaction = data[i];
            if (transaction.transactionType.name === "TOP_UP") {
                totalIncome += transaction.amount
            } else if (transaction.transactionType.name === "WITHDRAWAL") {
                totalExpense += transaction.amount
            }
            if (transaction.category.categoryType === 'Доход') {
                incomeGroup[transaction.category.categoryName] = (incomeGroup[transaction.category.categoryName] + transaction.amount) || transaction.amount;
            } else if (transaction.category.categoryType === 'Расход') {
                responseGroup[transaction.category.categoryName] = (responseGroup[transaction.category.categoryName] + transaction.amount) || transaction.amount;
            }
            transTypes[transaction.transactionStatus.status] = (transTypes[transaction.transactionStatus.status] + 1) || 1;
        }

        statistics = {
            income: totalIncome,
            expense: totalExpense,
            incomeGroup,
            responseGroup,
            transTypes
        };
        console.log(statistics)
        return statistics
    };


    return (
        <>
            <div> List Transactions Component</div>
            {currentUser && (
                <div>
                    <h2 className="text-center">Список транзакций</h2>
                    <div className="row">
                        <button onClick={goto} className="btn btn-primary"> Добавить транзакцию</button>
                    </div>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <td> Сумма</td>
                                <td> Дата</td>
                                <td> Категория</td>
                                <td> Описание</td>
                                <td> банк отправителя</td>
                                <td> банк получателя</td>
                                <td> ИНН получателя</td>
                                <td> Статус транзакции</td>
                                <td> Тип транзакции</td>
                                <td colSpan="2"></td>
                            </tr>
                            </thead>
                            <tbody>
                            {transactions.map(transaction =>
                                <tr key={transaction.id}>
                                    <td> {transaction.amount}</td>
                                    <td> {new Date(transaction.transactionDateTime).toLocaleDateString()}</td>
                                    <td> {transaction.category.categoryName}</td>
                                    <td> {transaction.comment}</td>
                                    <td> {transaction.senderBank.bankName}</td>
                                    <td>  {transaction.recipientBank.bankName}</td>
                                    <td>  {transaction.recipientInn}</td>
                                    <td>  {transaction.transactionStatus.status}</td>
                                    <td>  {transaction.transactionType.name}</td>
                                    <td>{<Link to={`/transactions/${transaction.id}/edit`}
                                               className="btn btn-info">Редактировать</Link>}
                                        {<Link to={`/transactions/${transaction.id}/delete`}
                                               className="btn btn btn-danger"
                                               onClick={() => deleteTransaction(transaction.id)}>Удалить</Link>}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <h3>Статистика по транзакциям</h3>
                    <h4>Динамика по количеству транзакций в разрезе недель</h4>
                    {Object.entries(groupByWeek(transactions)).map(([week, items]) => (
                        <div key={week}>
                            <b>Неделя: {week}</b><br/>
                            Количество транзакций: {items.length}<br/>
                            Cтатистика транзакций:
                            <ul>
                                {Object.entries(getStatByPeriod(items).transTypes).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Доходы: {getStatByPeriod(items).income}
                            <ul>
                                {Object.entries(getStatByPeriod(items).incomeGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Расходы: {getStatByPeriod(items).expense}
                            <ul>
                                {Object.entries(getStatByPeriod(items).responseGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Баланс на период: {getStatByPeriod(items).income - getStatByPeriod(items).expense}
                        </div>
                    ))}
                    <h4>Динамика по количеству транзакций в разрезе месяцев</h4>
                    {Object.entries(groupByMonth(transactions)).map(([month, items]) => (
                        <div key={month}>
                            <b>Месяц: {month}</b><br/>
                            Количество транзакций: {items.length}<br/>
                            Cтатистика транзакций:
                            <ul>
                                {Object.entries(getStatByPeriod(items).transTypes).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Доходы: {getStatByPeriod(items).income}
                            <ul>
                                {Object.entries(getStatByPeriod(items).incomeGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Расходы: {getStatByPeriod(items).expense}
                            <ul>
                                {Object.entries(getStatByPeriod(items).responseGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Баланс на период: {getStatByPeriod(items).income - getStatByPeriod(items).expense}
                        </div>
                    ))}
                    <h4>Динамика по количеству транзакций в разрезе кварталов</h4>
                    {Object.entries(groupByQuarter(transactions)).map(([quarter, items]) => (
                        <div key={quarter}>
                            <b>Квартал: {quarter}</b><br/>
                            Количество транзакций: {items.length}<br/>
                            Cтатистика транзакций:
                            <ul>
                                {Object.entries(getStatByPeriod(items).transTypes).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Доходы: {getStatByPeriod(items).income}
                            <ul>
                                {Object.entries(getStatByPeriod(items).incomeGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Расходы: {getStatByPeriod(items).expense}
                            <ul>
                                {Object.entries(getStatByPeriod(items).responseGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Баланс на период: {getStatByPeriod(items).income - getStatByPeriod(items).expense}
                        </div>
                    ))}
                    <h4>Динамика по количеству транзакций в разрезе годов</h4>
                    {Object.entries(groupByYear(transactions)).map(([year, items]) => (
                        <div key={year}>
                            <b>Год: {year}</b><br/>
                            Количество транзакций: {items.length}<br/>
                            Cтатистика транзакций:
                            <ul>
                                {Object.entries(getStatByPeriod(items).transTypes).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Доходы: {getStatByPeriod(items).income}
                            <ul>
                                {Object.entries(getStatByPeriod(items).incomeGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Расходы: {getStatByPeriod(items).expense}
                            <ul>
                                {Object.entries(getStatByPeriod(items).responseGroup).map(
                                    ([group, sum]) => (
                                        <li key={group}>{group} : {sum}</li>
                                    )
                                )}
                            </ul>
                            Баланс на период: {getStatByPeriod(items).income - getStatByPeriod(items).expense}
                        </div>
                    ))}
                </div>
            )}
            {!currentUser && (
                <div>
                    <strong> Вы не авторизованы! </strong>
                </div>
            )}
        </>
    )
}

export default ListTransactions