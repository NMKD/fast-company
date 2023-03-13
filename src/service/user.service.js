import httpServer from "./http.service";
import config from "../config.json";

const urlUsers = `${config.apiEndPoint}user/`;

const userService = {
    put: async (id, obj) => {
        try {
            return await httpServer.put(`${urlUsers}${id}`, obj);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    get: async (id) => {
        try {
            return await httpServer.get(`${urlUsers}${id}`);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    post: async (content) => {
        try {
            return await httpServer.post(`${urlUsers}`, content);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    delete: async (id) => {
        try {
            return await httpServer.delete(`${urlUsers}${id}`);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    },
    fetchAll: async () => {
        try {
            return await httpServer.get(urlUsers);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    }
};

export default userService;
