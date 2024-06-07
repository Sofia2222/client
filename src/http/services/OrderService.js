import api from "../index.js";

const pathRequest = 'api/orders'

export default class OrderService {
    static async getOrders({limit, offset}) {
        return await api.get(`${pathRequest}?limit=${limit}&offset=${offset}`);
    }
    static async update({orderId, statusId}) {
        return await api.put(`${pathRequest}/update`,
            {
                id: orderId,
                params: {
                    statusId
                }
            });
    }
    static async getOrderById({id}) {
        return await api.get(`${pathRequest}/${id}`);
    }
}