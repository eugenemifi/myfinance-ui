import axios from "axios";

const API_URL = "http://localhost:8089/api/v1/auth/";

class AuthService {
    register(login, email, password) {
        return axios.post(API_URL + "register", {
            login,
            email,
            password
        });
    };

    login(login, password) {
        return axios.post(API_URL + "login", {
            login,
            password
        })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
            })
    };

    logout() {
        localStorage.removeItem("user");
    };

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService()