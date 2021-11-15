import {makeAutoObservable} from "mobx";

class CartStore{

    constructor() {
        makeAutoObservable(this);
    }

    products = []

    addProduct(product){
        this.products.push({
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                availableCount: product.availableCount
            },
            count: product.count
        });
    }

    clear(){
        this.products = []
    }
}

export default new CartStore();