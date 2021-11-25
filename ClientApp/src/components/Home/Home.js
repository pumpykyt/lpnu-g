import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import productService from "../../services/productService";
import productStore from "../../stores/productStore";
import {Button, Card, Input} from "antd";
import cartStore from "../../stores/cartStore";
import authStore from "../../stores/authStore";

const Home = observer(() => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('default');

    useEffect(() => {
        productService.getProducts(searchQuery, sortQuery);
    }, [sortQuery]);

    const searchHandler = async() => {
        await productService.getProducts(searchQuery, sortQuery);
    }

    return (
        <div className="home">
            <div className="container">
                <div className="filters-wrapper my-5 w-full">
                    <Button onClick={() => {setSortQuery('price_desc')}}>Сортувати по спаданню ціною</Button>
                    <Button onClick={() => {setSortQuery('price_asc')}}>Сортувати за зростанню ціною</Button>
                    <div className="w-6/12 grid grid-cols-10">
                        <div className="col-span-7">
                            <Input onChange={async(e) => await setSearchQuery(e.target.value)} placeholder="Пошук"/>
                        </div>
                        <div className="col-span-3">
                            <Button onClick={searchHandler} type="info">Знайти</Button>
                        </div>
                    </div>
                </div>
                <div className="products-wrapper grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-3 my-5">
                    {
                        productStore.products.map((product) =>
                            <div className="rounded overflow-hidden shadow-lg" key={product.id}>
                                    <img className="w-full object-cover" style={{height: '300px'}} src={'https://localhost:5001/wwwroot/' + product.imagePath} alt=""/>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{product.name}</div>
                                        <p className="text-gray text-lg font-bold">
                                            {product.price}грн
                                        </p>
                                        { authStore.isLoggedIn && !authStore.isAdmin &&
                                            <div className="grid grid-cols-4">
                                                <div className="col-span-3">
                                                    <Button type="primary" onClick={() => {
                                                        cartStore.addProduct(product);
                                                    }}>Додати в корзину</Button>
                                                </div>
                                                <div className="col-span-1">
                                                    <Input defaultValue={0} type="number" onChange={(e) => {
                                                        product.count = e.target.value;
                                                    }}/>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Спортивний інвентар</span>
                                    </div>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
});

export default Home;