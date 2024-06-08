import api from "../index.js";

const pathRequest = 'api/analytics'

export default class AnalyticsStore {
    static async getCounts() {
        return await api.get(`${pathRequest}/counts`);
    }
}