import {Link, useNavigate} from "react-router";
import AuthService from "../services/auth.service";
import {useState} from "react";

function ListTransactions({transactions}) {

    const [currentUser] = useState(AuthService.getCurrentUser);

    const navigate = useNavigate();

    const goto = () => {
        navigate("/create-trans");
    }

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
                                    <td>{<Link to={`${transaction.id}`}
                                               className="btn btn-info">Редактировать</Link>}
                                        {<Link to={`/users`} className="btn btn btn-danger">Удалить</Link>}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
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