import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {ProductListReducer, ProductDetailsReducer} from './reducer/productReducers'
import {cartReducer} from './reducer/cartReducers'
import { userLoginReducer } from "./reducer/userReducers";

const reducer = combineReducers({
    productList : ProductListReducer,
    productDetails : ProductDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart : {cartItems : cartItemsFromLocalStorage},
    userLogin : {userInfo : userInfoFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store