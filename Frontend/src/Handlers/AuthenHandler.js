import axios from "axios";

class AuthenHandler {
    loginHandler(user) {
        return axios.post("http://localhost:8080/api/authen/login", user, {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    logoutHandler(email) {
        return axios.get("http://localhost:8080/api/authen/logout/" + email, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
    }

    changePwdHandler(changePwdRequest) {
        return axios.put("http://localhost:8080/api/authen/changePassword", changePwdRequest, {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    
}

export default new AuthenHandler();