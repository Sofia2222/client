import axios from "axios";

export const API_URL = "http://localhost:5000/auth";


const api = axios.create({
    withCredentials: true,
    "Content-Type": "application/json",
    baseURL: API_URL,
});
api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401) {
        originalRequest._isRetry = true;
        try {
            const res = await axios.get(API_URL + '/refresh', {withCredentials: true});
            console.log(res.data)
            localStorage.getItem('token', res.data.accessToken);
            return res.request(originalRequest);
        }catch (e) {
            console.log('не авторізований')
        }

    }
})

export default api;