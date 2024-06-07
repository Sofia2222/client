import ContactsService from "../http/services/ContactsService.js";
import {makeAutoObservable, runInAction} from "mobx";


class ContactsStore {

    contacts = [];
    isLoading = false;
    totalContacts = 0;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    fetchContacts = async ({limit, offset}) => {
        try {
            this.isLoading = true;
            const res = (await ContactsService.getContacts({limit, offset})).data.contacts;
            console.log(res)
            runInAction(() => {
                this.totalContacts = res.meta.allCount;
                this.contacts = res.data;
                this.isLoading = false;
            })

        }catch (e) {
            this.isLoading = false;
        }
    }
    addContact = async ({contact}) => {
        try {
            this.isLoading = true;
            await ContactsService.create({contact})
            this.isLoading = false;
        }catch (e) {
            this.isLoading = false;
            console.log(e)
        }

    }
    deleteContact = async ({contactId}) => {
        try {

            this.isLoading = true;
            await ContactsService.delete({contactId})
            this.contacts = this.contacts.filter(contact => contact.id !== contactId);
            this.isLoading = false;
        }catch (e) {
            this.isLoading = false;
            console.log(e)
        }
    }
    updateContact = async ({contact}) => {
        try{
            this.isLoading = true;
            await ContactsService.update({contactId: contact.id, contact})
            this.isLoading = false;
        }catch (e) {
            console.log(e)
        }
    }
}

export default new ContactsStore();