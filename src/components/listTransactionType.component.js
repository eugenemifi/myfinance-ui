import AuthService from "../services/auth.service";
import {useEffect, useState} from "react";
import TransactionTypesService from "../services/transaction-types.service";

function ListTransactionType() {

    const [currentUser] = useState(AuthService.getCurrentUser);

    const [types, setTypes] = useState([])

    useEffect(() => {
        TransactionTypesService.getTransactionTypes()
            .then((response) => {
                const data = response.data;
                setTypes(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div> List Transaction Types Component</div>
            {currentUser && (
                <div>
                    <h2 className="text-center">Список типов транзакций</h2>
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
                            {types.map(type =>
                                <tr key={type.id}>
                                    <td> {type.id}</td>
                                    <td> {type.name}</td>
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

export default ListTransactionType