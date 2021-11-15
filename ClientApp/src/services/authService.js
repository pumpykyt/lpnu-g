import myAxios from './../myAxios'
import authStore from './../stores/authStore'
import apiStore from './../stores/apiStore'
import {notification} from "antd";

class AuthService{

    async register(data, history){
        try{
            apiStore.setIsFetching(true)
            const response = await myAxios.post('/api/auth/register', {
                email: data.email,
                userName: data.email,
                password: data.password
            })
            history.push('/')
            console.log(response)
            notification.success({
                message: 'Реєстрація успішна. Увійдіть в систему'
            });
        }catch(err){
            console.log(err)
        }finally{
            apiStore.setIsFetching(false)
        }
    }

    async login(data, history){
        try{
            apiStore.setIsFetching(true)
            const response = await myAxios.post('/api/auth/login', data)
            authStore.login(response.data.token)
            history.push('/')
            console.log(response)
            notification.success({
                message: 'Вхід в систему успішний'
            });
        }catch(err){
            console.log(err)
            notification.error({
                message: 'Дані неправильні'
            });
        }finally {
            apiStore.setIsFetching(false)
        }
    }
}

export default new AuthService()