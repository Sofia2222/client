import AnalyticsStore from "../http/services/AnalyticsStore.js";
import {makeAutoObservable, runInAction} from "mobx";


class ContactsStore {

    counts = {};

    isLoading = false;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    fetchCounts = async () => {
        try {
            this.isLoading = true;
            this.counts = (await AnalyticsStore.getCounts()).data.counts;
            this.isLoading = false;
        }catch (e) {
            console.log(e);
            this.isLoading = false;
        }
    }
}

export default new ContactsStore();