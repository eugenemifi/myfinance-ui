import axios from "axios";

const API_URL = "http://localhost:8089/api/v1/auth/";

class AuthService {
    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    login(username, password) {
        return axios.post(API_URL + "signin", {
            username,
            password
        })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
            }).catch((reason) => {
                console.log(reason)
            })
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService()