import OrderService from "../http/services/OrderService.js";
import {makeAutoObservable} from "mobx";


class OrderStore {

    orders = {};

    constructor() {
        makeAutoObservable(this)
    }

    fetchOrders({limit, offset}){
        OrderService.getOrders({limit, offset}).then((res) => {
            this.orders = res.data.orders.data
        });
    }

}

export default new OrderStore();