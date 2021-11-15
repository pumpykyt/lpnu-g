import {observer} from "mobx-react-lite";
import cartStore from "../../stores/cartStore";
import {Button, Table} from "antd";
import {useEffect} from "react";
import orderService from "../../services/orderService";

const Cart = observer(() => {

    function getTotalPrice(){
        let sum = 0;
        for(let i = 0; i < cartStore.products.length; i++){
            sum += cartStore.products[i].count * cartStore.products[i].product.price;
        }
        return sum;
    }

    const createOrder = async() => {
        let products = [];
        for(let i = 0; i < cartStore.products.length; i++){
            products.push({
                productId : cartStore.products[i].product.id,
                count : cartStore.products[i].count
            });
        }
        await orderService.createOrder(products)
    }

    return (
        <div className="cart w-screen">
            <div className="container mx-auto">
                <div className="order-wrapper grid grid-cols-1 gap-3 mt-16">
                    <h2 className="text-2xl font-bold">Корзина</h2>
                    {
                        cartStore.products.map((item) =>
                            <div key={item.product.id} className="grid grid-cols-12 bg-gray-300 rounded p-2">
                                <div className="text-lg font-bold text-black col-span-4">Товар: {item.product.name}</div>
                                <div className="text-lg text-black col-span-2">Ціна за шт: {item.product.price}грн</div>
                                <div className="text-lg text-black col-span-1">Кількість: {item.count}</div>
                            </div>
                        )
                    }
                    <div className="block">
                        <div className="float-right">
                            <h3 className="text-black text-xl">До сплати: {getTotalPrice()}грн</h3>
                            <Button onClick={async() => await createOrder()} type="primary">Оформити замовлення</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
});

export default Cart;