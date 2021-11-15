import {observer} from "mobx-react-lite";
import {Button, Table} from "antd";
import authStore from "../../stores/authStore";
import {useEffect} from "react";
import orderService from "../../services/orderService";
import cartStore from "../../stores/cartStore";

const Profile = observer(() => {

    useEffect(() => {
        orderService.getCurrentUserOrders();
    }, [])

    return (
        <div className="profile">
            <div className="order-wrapper grid grid-cols-1 gap-3 mt-16 container">
                <h3 className="text-lg text-black font-bold">Мої замовлення:</h3>
                {
                    authStore.orders.map((item) =>
                        <div key={item.id} className="grid grid-cols-12 bg-gray-300 rounded p-2">
                            <div className="text-lg font-bold text-black col-span-4">id: {item.id}</div>
                            <div className="text-lg text-black col-span-2">Ціна: {item.totalPrice}грн</div>
                            <div className="text-lg text-black col-span-4">Статус: {item.status}</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
});

export default Profile;