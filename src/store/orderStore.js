import OrderService from "../http/services/OrderService.js";
import StatusService from "../http/services/StatusService.js";
import {makeAutoObservable, runInAction} from "mobx";


class OrderStore {

    orders = [];
    statuses = [];
    isLoading = false;
    totalOrders = 0;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    fetchOrders = async ({limit, offset}) => {
        try {
            this.isLoading = true;
            const res = (await OrderService.getOrders({limit, offset})).data.orders;
            runInAction(() => {
                this.totalOrders = res.meta.allCount;
                this.orders = res.data;
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

    updateOrderStatus = async ({orderId, statusId}) => {
        try{
            await OrderService.update({orderId, statusId});
        }catch (e) {
            console.log(e)
        }
    }
}

export default new OrderStore();