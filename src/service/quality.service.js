import httpServer from "./http.service";
import config from "../config.json";

const urlQuality = `${config.apiEndPoint}quality/`;

const qualityService = {
    fetchAll: async () => {
        try {
            return await httpServer.get(urlQuality);
        } catch (e) {
            console.error("Expected error: ", e.message);
            return e.message;
        }
    }
};

export default qualityService;
