import AnalyticsSrevices from "../http/services/AnalyticsSrevices.js";
import {makeAutoObservable, runInAction} from "mobx";


class ContactsStore {

    counts = {};
    statusesInfo = [];
    ordersInfo = [];
    isLoading = false;
    chatBotInfo = ''
    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    fetchCounts = async () => {
        try {
            this.isLoading = true;
            this.counts = (await AnalyticsSrevices.getCounts()).data.counts;
            this.isLoading = false;
        }catch (e) {
            console.log(e);
            this.isLoading = false;
        }
    }
    fetchStatusesInfo = async () => {
        try {
            this.isLoading = true;
            this.statusesInfo = (await AnalyticsSrevices.getAnalyticsStatuses()).data.analytic;
            console.log(this.statusesInfo);
            this.isLoading = false;
        }catch (e) {
            console.log(e);
            this.isLoading = false;
        }
    }
    fetchOrderInfo = async ({from, to}) => {
        try {
            this.isLoading = true;
            this.ordersInfo = (await AnalyticsSrevices.getAnalytics({from, to})).data.analytic;
            this.isLoading = false;
        }catch (e) {
            console.log(e);
            this.isLoading = false;
        }
    }
    fetchChatBotAdvise = async () => {
        try {
            this.isLoading = true;
            this.chatBotInfo = (await AnalyticsSrevices.getChatBotAdvise()).data.analytic;
            this.isLoading = false;
        }catch (e) {
            console.log(e);
            this.isLoading = false;
        }
    }
}

export default new ContactsStore();