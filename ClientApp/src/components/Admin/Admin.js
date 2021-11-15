import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from 'react';
import productStore from "../../stores/productStore";
import {Button, Space, Table} from "antd";
import productService from "../../services/productService";
import * as yup from "yup";
import {Formik} from "formik";
import Modal from "antd/es/modal/Modal";
import authStore from "../../stores/authStore";
import orderService from "../../services/orderService";

const Admin = observer(() => {

    const [base64, setBase64] = useState('')
    const [oldProduct, setOldProduct] = useState({})
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        orderService.getOrders()
    }, [])

    const columns = [
        {
            title: 'Ідентифікатор',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Назва',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ціна',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Сток',
            dataIndex: 'availableCount',
            key: 'availableCount',
        },
        {
            title: 'Дії',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        setShowEditModal(true)
                        setOldProduct(record)
                    }}>Редагувати</Button>
                    <Button type="primary" onClick={async() => {
                        setOldProduct(record)
                        await productService.deleteProduct(record.id);
                    }}>Видалити</Button>
                </Space>
            ),
        },
    ];

    const columns2 = [
        {
            title: 'Ідентифікатор',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Оплата',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Дії',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {
                        record.status === 'Pending' &&
                        <Button type="primary" onClick={async () => {
                            await orderService.acceptOrder(record.id);
                            window.location.reload();
                        }}>Завершити</Button>
                    }
                </Space>
            ),
        },
    ];

    const validator = yup.object().shape({
        name: yup.string().required('Необхідне поле'),
        price: yup.number().required('Необхідне поле').moreThan(0, 'Ціна повинна бути додатньою'),
        availableCount: yup.number().required('Необхідне поле').moreThan(0, 'Кількість повинна бути додатньою')
    });

    const editProductHandler = async (product) => {
        await productService.editProduct(product)
    }

    const handleCancel = () => {
        setShowEditModal(false);
    };

    const addProductHandler = async (product) => {
        product.base64 = base64;
        await productService.postProduct(product)
    }

    const getBase64 = e => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            console.log(reader.result);
            setBase64(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <div className="admin w-screen">
            <div className="container">
                <div className="grid grid-cols-2 gap-5 my-5">
                    <Formik initialValues={{
                        name: '',
                        price: '',
                        availableCount: ''
                    }} validateOnBlur validationSchema={validator} onSubmit={async (values) => await addProductHandler(values)}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              isValid,
                              handleSubmit,
                              dirty
                          }) => (
                            <div>
                                <div className="bg-gray-100 p-5 rounded">
                                    <h3 className="text-2xl mb-2">Добавити спорт. інвентар</h3>
                                    {touched.name && errors.name && <p className="text-sm-left text-red-500 mb-2">{errors.name}</p>}
                                    <p>
                                        <input
                                            placeholder="Назва"
                                            type="text"
                                            name="name"
                                            className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                    </p>
                                    {touched.price && errors.price && <p className="text-sm-left text-red-500 mb-2">{errors.price}</p>}
                                    <p>
                                        <input
                                            placeholder="Ціна"
                                            type="number"
                                            name="price"
                                            className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price}
                                        />
                                    </p>
                                    {touched.availableCount && errors.availableCount && <p className="text-sm-left text-red-500 mb-2">{errors.availableCount}</p>}
                                    <p>
                                        <input
                                            placeholder="Доступна кількість"
                                            type="number"
                                            name="availableCount"
                                            className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.availableCount}
                                        />
                                    </p>
                                    <input className="mb-4" type="file" name="file" onChange={getBase64} />
                                    <button className="bg-dark text-white py-1 px-3 rounded" disabled={!isValid && !dirty} onClick={handleSubmit} type="submit">Добавити</button>
                                </div>
                            </div>
                        )}
                    </Formik>
                    <Table dataSource={authStore.adminOrders} columns={columns2}/>
                </div>
                <Table columns={columns} dataSource={productStore.products}/>
                <Modal onCancel={handleCancel} title="Редагувати" visible={showEditModal} footer={[]}>
                    <Formik initialValues={{
                        id: oldProduct.id,
                        name: oldProduct.name,
                        price: oldProduct.price,
                        availableCount: oldProduct.availableCount
                    }} validateOnBlur validationSchema={validator} onSubmit={async (values) => await editProductHandler(values)}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              isValid,
                              handleSubmit,
                              dirty
                          }) => (
                            <div>
                                <div className="p-1 rounded">
                                    {touched.name && errors.name && <p className="text-sm-left text-red-500 mb-2">{errors.name}</p>}
                                    <p>
                                        <input
                                            placeholder="Назва"
                                            type="text"
                                            name="name"
                                            className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                    </p>
                                    {touched.price && errors.price && <p className="text-sm-left text-red-500 mb-2">{errors.price}</p>}
                                    <p>
                                        <input
                                            placeholder="Ціна"
                                            type="number"
                                            name="price"
                                            className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.price}
                                        />
                                    </p>
                                    {touched.availableCount && errors.availableCount && <p className="text-sm-left text-red-500 mb-2">{errors.availableCount}</p>}
                                    <p>
                                        <input
                                            placeholder="Доступна кількість"
                                            type="number"
                                            name="availableCount"
                                            className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.availableCount}
                                        />
                                    </p>

                                    <button className="bg-dark text-white py-1 px-3 rounded" disabled={!isValid && !dirty} onClick={handleSubmit} type="submit">Редагувати</button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </Modal>
            </div>
        </div>
    )
});

export default Admin;