import {makeAutoObservable, runInAction} from "mobx";
import ProductService from "../http/services/ProductService.js";


class ProductStore {

    products = [];
    isLoading = false;
    totalProducts = 0;

    constructor() {
        makeAutoObservable(this, {}, {deep: true})
    }

    fetchProducts = async ({limit, offset}) => {
        try {
            this.isLoading = true;
            const res = (await ProductService.getProducts({limit, offset})).data.products;
            console.log(res)
            runInAction(() => {
                this.totalProducts = res.meta.allCount;
                this.products = res.data;
                this.isLoading = false;
            })

        }catch (e) {
            this.isLoading = false;
        }
    }
    addProduct = async ({product}) => {
        try {
            this.isLoading = true;
            await ProductService.create({product})
            this.isLoading = false;
        }catch (e) {
            this.isLoading = false;
            console.log(e)
        }

    }
    deleteProduct = async ({productId}) => {
        try {

            this.isLoading = true;
            await ProductService.delete({productId})
            this.products = this.products.filter(product => product.id !== productId);
            this.isLoading = false;
        }catch (e) {
            this.isLoading = false;
            console.log(e)
        }
    }
    updateProduct = async ({product}) => {
        try{
            this.isLoading = true;
            await ProductService.update({productId: product.id, product})
            this.isLoading = false;
        }catch (e) {
            console.log(e)
        }
    }
}

export default new ProductStore();