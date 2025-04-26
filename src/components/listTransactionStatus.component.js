import AuthService from "../services/auth.service";
import {useEffect, useState} from "react";
import TransactionStatusService from "../services/transaction-status.service";

function ListTransactionStatus() {

    const [currentUser] = useState(AuthService.getCurrentUser);

    const [statuses, setStatuses] = useState([])

    useEffect(() => {
        TransactionStatusService.getTransactionStatuses()
            .then((response) => {
                const data = response.data;
                setStatuses(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div> List Transaction Status Component</div>
            {currentUser && (
                <div>
                    <h2 className="text-center">Список статусов транзакций</h2>
                    <br></br>
                    <div className="row">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <td> ID</td>
                                <td> Статус</td>
                            </tr>
                            </thead>
                            <tbody>
                            {statuses.map(status =>
                                <tr key={status.id}>
                                    <td> {status.id}</td>
                                    <td> {status.status}</td>
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

export default ListTransactionStatus