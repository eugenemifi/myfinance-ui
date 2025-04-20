import {useEffect, useState} from "react";
import DataFromMock from "../utils/util";
import AuthService from "../services/auth.service";
import TransactionService from "../services/transaction.service";
import axios from "axios";
import authHeader from "../services/auth-header";

function ListTransactions() {

    const [transactions, setTransactions] = useState(null);
    const [currentUser] = useState(AuthService.getCurrentUser);
    useEffect(() => {
        //axios.get('http://localhost:8089/api/v1/categories/4b3d711b-14de-4d77-83e0-34c4d51c2901', {headers: authHeader()}).then((response) => setTransactions(response)).catch((error) => {console.log(error)})
        TransactionService.getTransactions().then((response) => setTransactions(response)).catch((error) => {console.log(error)})
    });

    return (
        <>
            <div> List Transactions Component</div>
            {currentUser ? (
                    <div>
                        {JSON.stringify(transactions)}
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