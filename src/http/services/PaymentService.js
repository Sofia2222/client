import api from "../index.js";

const pathRequest = 'api/payments'

export default class PaymentService {
    static async getPayments({limit, offset}) {
        return await api.get(`${pathRequest}?limit=${limit}&offset=${offset}`);
    }
    static async create({payment}) {
        return await api.post(`${pathRequest}/create`, {
            payment
        });
    }
    static async delete({paymentId}) {
        return await api.delete(`${pathRequest}/delete`, {
            data: {id: paymentId}
        });
    }

    static async update({paymentId, payment}) {
        return await api.put(`${pathRequest}/update`,
            {
                id: paymentId,
                payment
            });
    }
}