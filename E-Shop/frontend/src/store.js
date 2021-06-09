import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {ProductListReducer, 
        ProductDetailsReducer,
        ProductDeleteReducer,
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer,
        productTopRatedReducer
} from './reducer/productReducers'

import {cartReducer} from './reducer/cartReducers'
import { userLoginReducer, 
        userRegisterReducer, 
        userDetailsReducer, 
        userUpdateProfileReducer,
        userListReducer,
        userDeleteReducer,
        userUpdateReducer,}
        from './reducer/userReducers'
        
import {orderCreateReducer, 
        orderDetailsReducer, 
        orderPayReducer,
        myOrderListReducer,
        OrderListReducer,
        orderDeliverReducer} 
        from './reducer/orderReducer'

const reducer = combineReducers({
    productList : ProductListReducer,
    productDetails : ProductDetailsReducer,
    productDelete : ProductDeleteReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart : cartReducer,
    
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete : userDeleteReducer,
    userList : userListReducer,
    userUpdate : userUpdateReducer,

    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderList : myOrderListReducer,
    allOrders : OrderListReducer,
    orderDeliver : orderDeliverReducer,
    
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ?
JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart : {cartItems : cartItemsFromLocalStorage,
            shippingAddress : shippingAddressFromLocalStorage},
    userLogin : {userInfo : userInfoFromLocalStorage},
    
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store