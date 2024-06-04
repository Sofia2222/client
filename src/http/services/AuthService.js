import api from "../index.js";

export default class AuthService {
    static async signIn(email, password, domain) {
        return await api.post('auth/signIn', {email, password, subdomain: domain});
    }
    static async signUp(name, surname, domain, phone, email, password) {
        return await api.post('auth/signUp', {firstName: name, lastName: surname, phone, email, password, subdomain: domain});
    }
    static async logout() {
        return await api.post('auth/logout');
    }
}