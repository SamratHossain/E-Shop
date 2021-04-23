import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {ProductListReducer, ProductDetailsReducer} from './reducer/productReducers'
import {cartReducer} from './reducer/cartReducers'

const reducer = combineReducers({
    productList : ProductListReducer,
    productDetails : ProductDetailsReducer,
    cart: cartReducer,
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart : {cartItems : cartItemsFromLocalStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store