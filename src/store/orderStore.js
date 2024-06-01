import OrderService from "../http/services/OrderService.js";
import StatusService from "../http/services/StatusService.js";

import {makeAutoObservable, runInAction} from "mobx";
import StatuseService from "../http/services/StatusService.js";


class OrderStore {

    orders = [];
    statuses = [];
    isLoading = false;
    pages = 0;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    fetchOrders = async ({limit, offset}) => {
        try {
            this.isLoading = true;
            const res = (await OrderService.getOrders({limit, offset})).data.orders.data;
            runInAction(() => {
                this.orders = res;
                this.isLoading = false;
            })

        }catch (e) {
            this.isLoading = false;
        }
    }
    fetchStatuses = async () => {
        try {
            this.statuses = (await StatusService.getStatuses()).data.statuses;
        }catch (e) {
            console.log(e)
        }
    }
}

export default new OrderStore();