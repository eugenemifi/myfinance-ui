import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/v1/transactions/";

class TransactionService {

    async getTransactions() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    async searchTransaction(senderId, recipientId, startDate, endDate, transStatus,
                            recipientInn, minAmount, maxAmount, transType, category) {
        startDate = new Date(startDate).getTime();
        console.log("Start date from search: ", startDate)
        endDate = new Date(endDate);
        endDate.setHours(23, 59, 59, 999);
        endDate = endDate.getTime();
        // startDate += "T00:00:00.000";
        // endDate += "T23:59:59.999";
        return axios({
            method: 'get',
            url: API_URL + "search",
            params: {
                senderId: senderId,
                recipientId: recipientId,
                startDate: startDate,
                endDate: endDate,
                transStatus: transStatus,
                recipientInn: recipientInn,
                minAmount: minAmount,
                maxAmount: maxAmount,
                transType: transType,
                category: category
            },
            headers: authHeader()
        })
    }

    createTransaction(transaction) {
        return axios.post(API_URL, transaction, {headers: authHeader()})
    }

    async getTransactionById(transactionId) {
        return axios.get(API_URL + transactionId, {headers: authHeader()})
    }

    updateTransaction(transaction) {
        return axios.put(API_URL, transaction, {headers: authHeader()})
    }

    deleteTransaction(transactionId) {
        return axios.delete(API_URL + transactionId, {headers: authHeader()})
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TransactionService()