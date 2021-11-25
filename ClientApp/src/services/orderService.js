import apiStore       from "../stores/apiStore";
import myAxios        from "../myAxios";
import {notification} from "antd";
import cartStore      from "../stores/cartStore";
import authStore      from "../stores/authStore";
import jwtDecode      from "jwt-decode";

class OrderService{

    async createOrder(products){
        try{
            apiStore.setIsFetching(true);
            const userId = jwtDecode(localStorage.getItem('token')).id;
            const response = await myAxios.post("/api/order/create?userId=" + userId, {
                products
            });
            cartStore.clear()
            notification.success({
                message: 'Замовлення прийняте'
            });
        }catch (err){
            console.log(err)
            notification.error({
                message: err.message
            });
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async getOrders(){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/order/all');
            authStore.adminOrders = response.data;
        }catch (err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async acceptOrder(orderId){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.post('/api/order/accept?orderid=' + orderId);
            authStore.editOrderStatus(orderId);
            notification.success({
                message: 'Замовлення виконано'
            });
        }catch(err){
            console.log(err)
            notification.error({
                message: 'Помилка сервера'
            });
        }finally{
            apiStore.setIsFetching(false);
        }
    }

    async getCurrentUserOrders(){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.get('/api/order/get');
            authStore.orders = response.data;
        }catch(err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }
}

export default new OrderService();