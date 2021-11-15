import {makeAutoObservable} from "mobx";
import jwtDecode from "jwt-decode";

const initialToken = localStorage.getItem('token');

class AuthStore {
    constructor() {
        makeAutoObservable(this);
    }

    isLoggedIn = !!initialToken;
    isAdmin = (initialToken !== null ? jwtDecode(initialToken).role === 'admin' : false);
    orders = [];
    adminOrders = [];

    login(token){
        localStorage.setItem('token', token)
        this.isLoggedIn = true;
        this.isAdmin = jwtDecode(token).role === 'admin';
    }

    logout(){
        localStorage.removeItem('token');
        this.isLoggedIn = false;
        this.isAdmin = false;
    }

    getCurrentUserEmail(){
        return jwtDecode(localStorage.getItem('token')).email;
    }

    editOrderStatus(orderId){
        this.products = this.adminOrders.map(t => t.id === orderId ? {...t, status: 'Completed'} : t);
    }
}

export default new AuthStore();