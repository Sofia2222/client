import api from "../index.js";

export default class OrderService {
    static async getOrders() {
        return await api.get('api/orders');
    }
}