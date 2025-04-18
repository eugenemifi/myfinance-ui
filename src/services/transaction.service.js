import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/v1/transactions";

class TransactionService {

    getTransactions() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    createTransaction(transaction) {
        return axios.post(API_URL, transaction, {headers: authHeader()})
    }

    getTransactionById(transactionId) {
        return axios.get(API_URL + transactionId,{headers: authHeader()})
    }

    updateTransaction(transaction) {
        return axios.put(API_URL + transaction.id, transaction, {headers: authHeader()})
    }

    deleteTransaction(transactionId) {
        return axios.delete(API_URL + transactionId, {headers: authHeader()})
    }
}

export default new TransactionService()