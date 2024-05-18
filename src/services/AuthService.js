import api from "../http/index.js";

export default class AuthService {
    static async signIn(email, password, domain) {
        return await api.post('/signIn', {email, password, subdomain: domain});
    }
    static async signUp(name, surname, domain, phone, email, password) {
        return await api.post('/signUp', {firstName: name, lastName: surname, phone, email, password, subdomain: domain});
    }
    static async logout() {
        return await api.post('/logout');
    }
}