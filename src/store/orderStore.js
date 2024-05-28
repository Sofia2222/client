import OrderService from "../http/services/OrderService.js";

import {makeAutoObservable} from "mobx";

export default class OrderStore {

    orders = []

    constructor() {
        makeAutoObservable(this)
    }

    setOrders(orders) {

    }


}