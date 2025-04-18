import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8089/api/v1/users/";

class UserService {

    getUsers() {
        return axios.get(API_URL, {headers: authHeader()});
    }

    createUser(user) {
        return axios.post(API_URL, user, {headers: authHeader()});
    }

    getUserById(userId) {
        return axios.get(API_URL + userId, {headers: authHeader()})
    }

    updateUser(user) {
        return axios.put(API_URL + user.id, user, {headers: authHeader()})
    }

    deleteUser(userId) {
        return axios.delete(API_URL + userId, {headers: authHeader()})
    }
}

export default new UserService()