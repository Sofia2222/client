import {makeAutoObservable} from "mobx";
import AuthService from "../http/services/AuthService.js";
import axios from "axios";

export default class AuthStore {

    isAuth = false;
    isLoading = false;
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(isAuth) {
        this.isAuth = isAuth;
    }
    setLoading(isLoading) {
        this.isLoading = isLoading;
    }

    async signIn(email, password, domain) {
        try {
            console.log(email, password)
            const res = await AuthService.signIn(email, password, domain);
            console.log(res)
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("subdomain", res.data.subdomain);
            this.setAuth(true);
        }catch (e) {
            console.log(e)
        }
    }
    async signUp(name, surname, domain, phone, email, password, novigate) {
        try {
            console.log(name, surname, domain, phone, email, password,)
            const res = await AuthService.signUp(name, surname, domain, phone, email, password);
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("subdomain", res.data.subdomain);
            this.setAuth(true);
            novigate('/')
        }catch (e) {
            console.log(e)
        }
    }
    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem("token");
            localStorage.removeItem("subdomain");
            this.setAuth(false);
        }catch (e) {
            console.log(e)
        }
    }
    async checkAuth() {
        try {
            this.setLoading(true);
            const subdomain = localStorage.getItem("subdomain");
            const res = await axios.get('http://localhost:5000/auth/refresh', {withCredentials: true, headers: {subdomain}});
            localStorage.setItem("token", res.data.newAccessToken);
            this.setAuth(true);
        }catch (e) {
            console.log(e)
        } finally {
            this.setLoading(false);
        }
    }
}