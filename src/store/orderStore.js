import OrderService from "../http/services/OrderService.js";
import {makeAutoObservable, runInAction} from "mobx";


class OrderStore {

    orders = [];
    isLoading = false;

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


}

export default new OrderStore();