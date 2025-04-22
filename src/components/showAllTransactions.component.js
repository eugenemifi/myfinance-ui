import {useEffect, useState} from "react";
import TransactionService from "../services/transaction.service";
import ListTransactions from "./listTransactional.component";

function ShowAllTransactions() {

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        TransactionService.getTransactions()
            .then((response) => {
                const data = response.data;
                setTransactions(data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <ListTransactions transactions={transactions}/>
        </>
    );
}

export default ShowAllTransactions