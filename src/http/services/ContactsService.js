import api from "../index.js";

const pathRequest = 'api/contacts'

export default class ContactsService {
    static async getContacts({limit, offset}) {
        return await api.get(`${pathRequest}?limit=${limit}&offset=${offset}`);
    }
    static async create({contact}) {
        return await api.post(`${pathRequest}/create`, {
            contact
        });
    }
    static async delete({contactId}) {
        return await api.delete(`${pathRequest}/delete`, {
            data: {id: contactId}
        });
    }

    static async update({contactId, contact}) {
        return await api.put(`${pathRequest}/update`,
            {
                id: contactId,
                contact
            });
    }
}