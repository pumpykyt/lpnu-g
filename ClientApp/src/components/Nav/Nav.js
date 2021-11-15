import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import authStore from "../../stores/authStore";
import {useEffect} from "react";
import productService from "../../services/productService";

const Nav = observer(() => {
    useEffect(() => {
        productService.getProducts()
    },[])

    return (
        <div className="nav w-screen h-auto bg-red-500">
            <div className="container mx-auto grid grid-cols-6">
                <Link to="/" className="text-3xl py-2 text-white">Спортмаг</Link>
                <span className="col-span-2"/>
                { authStore.isLoggedIn && !authStore.isAdmin && <Link to="/cart" className="text-md my-auto text-white justify-self-end">Корзина</Link>}
                { authStore.isAdmin && <Link to="/admin" className="text-md my-auto text-white justify-self-end">Адмін панель</Link> }
                { !authStore.isLoggedIn ? <Link to="/login" className="text-md my-auto text-white justify-self-end">Вхід</Link>
                    : <Link to="/profile" className="text-white text-md my-auto justify-self-end">{authStore.getCurrentUserEmail()}</Link> }
                { !authStore.isLoggedIn ? <Link to="/register" className="text-md my-auto text-white justify-self-end">Реєстрація</Link>
                    : <div onClick={() => authStore.logout()} className="text-md my-auto text-white justify-self-end cursor-pointer">Вийти</div>}
            </div>
        </div>
    )
})

export default Nav;