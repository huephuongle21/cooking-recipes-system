import axios from "axios";

class UserHandler {

    registerHandler(newUser) {
        return axios.post("http://localhost:8080/api/user/register", newUser, {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getUserDetails(email) {
        return axios.get("http://localhost:8080/api/user/userDetails/" + email, {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        })
    }
}

export default new UserHandler();
