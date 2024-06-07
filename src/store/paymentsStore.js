import PaymentsService from "../http/services/PaymentService.js";
import {makeAutoObservable, runInAction} from "mobx";


class PaymentsStore {

    payments = [];
    isLoading = false;
    totalPayments = 0;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    fetchPayments = async ({limit, offset}) => {
        try {
            this.isLoading = true;
            const res = (await PaymentsService.getPayments({limit, offset})).data.payments;
            console.log(res)
            runInAction(() => {
                this.totalPayments = res.meta.allCount;
                this.payments = res.data;
                this.isLoading = false;
            })

        }catch (e) {
            this.isLoading = false;
        }
    }
    addPayment = async ({payment}) => {
        try {
            this.isLoading = true;
            await PaymentsService.create({payment})
            this.isLoading = false;
        }catch (e) {
            this.isLoading = false;
            console.log(e)
        }

    }
    deletePayment = async ({paymentId}) => {
        try {

            this.isLoading = true;
            await PaymentsService.delete({paymentId})
            this.payments = this.payments.filter(payment => payment.id !== paymentId);
            this.isLoading = false;
        }catch (e) {
            this.isLoading = false;
            console.log(e)
        }
    }
    updatePayment = async ({payment}) => {
        try{
            this.isLoading = true;
            await PaymentsService.update({paymentId: payment.id, payment})
            this.isLoading = false;
        }catch (e) {
            console.log(e)
        }
    }
}

export default new PaymentsStore();