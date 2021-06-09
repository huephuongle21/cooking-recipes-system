import axios from "axios";

class UserHandler {

    registerHandler(newUser) {
        return axios.post("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/user/register", newUser);
    }

    getUserDetails(email) {
        return axios.get("https://l6cjufwsoj.execute-api.us-east-1.amazonaws.com/stage-1/api/user/user-details/" + email);
    }
}

export default new UserHandler();
