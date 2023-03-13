import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(
    (res) => res,
    function (e) {
        const expErrors =
            e.response && e.response.status >= 400 && e.response.status < 500;
        if (!expErrors) {
            toast.error("Try again later or contact your administrator");
            console.error("Unexpected error: ", e.message);
        }
        return Promise.reject(e);
    }
);

const httpServer = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpServer;
