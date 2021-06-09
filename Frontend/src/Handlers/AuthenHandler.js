import axios from "axios";

class AuthenHandler {
    loginHandler(user) {
        return axios.post("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/authen/login", user);
    }

    logoutHandler(email) {
        return axios.get("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/authen/logout/" + email);
    }

    changePwdHandler(changePwdRequest) {
        return axios.put("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/authen/change-password", changePwdRequest);
    }
}

export default new AuthenHandler();