import api from "../index.js";

const pathRequest = 'api/products'

export default class ProductService {
    static async getProducts({limit, offset}) {
        return await api.get(`${pathRequest}?limit=${limit}&offset=${offset}`);
    }
    static async create({product}) {
        return await api.post(`${pathRequest}/create`, {
            product
        });
    }
    static async delete({productId}) {
        return await api.delete(`${pathRequest}/delete`, {
            data: {id: productId}
        });
    }

    static async update({productId, product}) {
        return await api.put(`${pathRequest}/update`,
            {
                id: productId,
                product
            });
    }
}