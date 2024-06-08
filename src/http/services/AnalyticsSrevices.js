import api from "../index.js";

const pathRequest = 'api/analytics'

export default class AnalyticsServices {
    static async getCounts() {
        return await api.get(`${pathRequest}/counts`);
    }getAnalyticsStatuses
    static async getAnalyticsStatuses() {
        return await api.get(`${pathRequest}/getAnalyticsStatuses`);
    }
    static async getAnalytics({from, to}) {
        return await api.post(`${pathRequest}/getAnalytics`, {
            from,
            to
        });
    }
    static async getChatBotAdvise() {
        return await api.get(`${pathRequest}/getAdviseChatBot`);
    }
}