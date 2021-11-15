import {makeAutoObservable} from "mobx";

class ProductStore{

    constructor() {
        makeAutoObservable(this);
    }

    products = []

    setProducts(arr){
        this.products = arr;
    }

    addProduct(product){
        this.products.push(product);
    }

    removeProduct(productId){
        this.products = this.products.filter(t => t.id !== productId);
    }

    editProduct(product){
        this.products = this.products.map(t => t.id === product.id ? product : t)
    }
}

export default new ProductStore();