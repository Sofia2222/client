import api from "../index.js";

export default class StatusService {
    static async getStatuses() {
        return await api.get(`api/status`);
    }
}