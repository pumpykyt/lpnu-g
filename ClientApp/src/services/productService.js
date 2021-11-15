import myAxios from "../myAxios";
import apiStore from "../stores/apiStore";
import productStore from "../stores/productStore";
import {notification} from "antd";

class ProductService{

    async postProduct(product){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.post('/api/product/add', product);
            productStore.addProduct(product)
            notification.success({
                message: 'Інвентар додано успішно'
            });
        }catch (err){
            console.log(err);
            notification.error({
                message: 'Помилка сервера'
            });
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async getProducts(searchQuery){
        try{
            apiStore.setIsFetching(true);
            let queryParams = '';
            if(searchQuery === null || searchQuery === undefined){
               queryParams = '';
            }else{
                queryParams = '?searchQuery=' + searchQuery;
            }
            const response = await myAxios.get('/api/product/get' + queryParams);
            productStore.setProducts(response.data)
        }catch (err){
            console.log(err);
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async deleteProduct(productId){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.delete('/api/product/delete?productId=' + productId);
            productStore.removeProduct(productId);
            notification.success({
                message : 'Успішно видалено'
            });
        }catch (err){
            console.log(err);
            notification.error({
                message : 'Помилка сервера'
            });
        }finally {
            apiStore.setIsFetching(false);
        }
    }

    async editProduct(product){
        try{
            apiStore.setIsFetching(true);
            const response = await myAxios.put('/api/product/edit?productId=' + product.id, product);
            productStore.editProduct(product)
            notification.success({
                message: 'Інвентар оновлено успішно'
            });
        }catch (err){
            console.log(err);
            notification.error({
                message: 'Помилка сервера'
            });
        }finally {
            apiStore.setIsFetching(false);
        }
    }
}

export default new ProductService();