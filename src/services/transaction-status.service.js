import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/v1/transactions/status/";

class TransactionStatusService {

    async getTransactionStatuses() {
        return axios.get(API_URL, {headers: authHeader()});
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TransactionStatusService()