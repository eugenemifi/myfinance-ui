import {useEffect, useState} from "react";
import DataFromMock from "../utils/util";
import AuthService from "../services/auth.service";

function ListTransactions() {

    const [transactions, setTransactions] = useState(DataFromMock.getTransactions);
    const [currentUser] = useState(AuthService.getCurrentUser);
    useEffect(() => {
        //TransactionService.getTransactions().then((response) => setTransactions(response)).catch((error) => {console.log(error)})
    });

    return (
        <>
            <div> List Transactions Component</div>
            <div> Data from Mock</div>
            {currentUser ? (
                    <div>
                        <h1 className="text-center"> Transaction List</h1>
                        <table className="table table-striped">
                            <thead>
                            <tr>

                                <td> Transaction Id</td>
                                <td> Transaction amount</td>
                                <td> Transaction date</td>
                                <td> Transaction category</td>
                                <td> Transaction description</td>
                            </tr>

                            </thead>
                            <tbody>

                            {transactions.map(transaction =>
                                <tr key={transaction.id}>
                                    <td> {transaction.id}</td>
                                    <td> {transaction.amount}</td>
                                    <td> {transaction.date}</td>
                                    <td> {transaction.category}</td>
                                    <td> {transaction.description}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                )
                :
                (
                    <div>
                        <strong> Вы не авторизованы! </strong>
                    </div>
                )}

        </>
    );
}

export default ListTransactions