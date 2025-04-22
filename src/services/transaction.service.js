import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/v1/transactions/";

class TransactionService {

    async getTransactions() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    async searchTransaction(minAmount, maxAmount, startDate, endDate, category) {
        return axios({
            method: 'get',
            url: API_URL,
            data: {
                minAmount: minAmount,
                maxAmount: maxAmount,
                startDate: startDate,
                endDate: endDate,
                category: category
            },
            headers: authHeader()
        })
    }

    createTransaction(transaction) {
        return axios.post(API_URL, transaction, {headers: authHeader()})
    }

    getTransactionById(transactionId) {
        return axios.get(API_URL + transactionId, {headers: authHeader()})
    }

    updateTransaction(transaction) {
        return axios.put(API_URL + transaction.id, transaction, {headers: authHeader()})
    }

    deleteTransaction(transactionId) {
        return axios.delete(API_URL + transactionId, {headers: authHeader()})
    }
}

export default new TransactionService()