import api from "../index.js";

export default class OrderService {
    static async getOrders({limit, offset}) {
        return await api.get(`api/orders?limit=${limit}&offset=${offset}`);
    }
}