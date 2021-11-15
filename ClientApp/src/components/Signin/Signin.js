import {observer} from 'mobx-react-lite'
import {Formik} from "formik";
import * as yup from "yup";
import {useHistory} from "react-router-dom";
import React, { Component }  from 'react';
import authService from "../../services/authService";



const Signin = observer(() => {

    const history = useHistory()

    const validator = yup.object().shape({
        email: yup.string().email().required('Необхідне поле'),
        password: yup.string().required('Необхідне поле')
    })

    const loginHandler = async (data) => {
        await authService.login(data, history)
    }

    return(
        <div className="signin">
            <Formik initialValues={{
                email: '',
                password: ''
            }} validateOnBlur validationSchema={validator} onSubmit={async (values) => await loginHandler(values)}
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
                    <div className="w-screen">
                        <div className="w-25 mx-auto bg-gray-300 mt-64 p-5 rounded">
                            <h3 className="text-2xl mb-2">Увійти в систему</h3>
                            {touched.email && errors.email && <p className="text-sm-left text-red-500 mb-2">{errors.email}</p>}
                            <p>
                                <input
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                    className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                            </p>
                            {touched.password && errors.password && <p className="text-sm-left text-red-500 mb-2">{errors.password}</p>}
                            <p>
                                <input
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    className="text-lg p-1 w-100 bg-gray-200 mb-2"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                />
                            </p>
                            <button className="bg-dark text-white py-1 px-3 rounded" disabled={!isValid && !dirty} onClick={handleSubmit} type="submit">Вхід</button>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
})

export default Signin;