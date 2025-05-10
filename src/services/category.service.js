import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/v1/categories/";

class CategoryService {

    async getCategories() {
        return axios.get(API_URL, {headers: authHeader()});
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CategoryService()