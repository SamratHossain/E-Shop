import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeToCart} from '../action/cartActions'


function CartScreen({match, location, history}) {

    const productId = match.params.id
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1
    console.log("quantity",quantity)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const removeToCartHandler = (id) => {
        dispatch(removeToCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
       
        <Row>
            <Col sm="8">
               
                {cartItems.length === 0 ? (
                    <Message variant="info">
                        Your Cart is Empty <Link to='/'>Go Back</Link>
                    </Message> 
                ):
                (
                    <ListGroup variant="flush">
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        Price : ${item.price}
                                    </Col>
                                    <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.quantity}
                                        onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                                >
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button type="button" variant="light"
                                                onClick = {() => removeToCartHandler(item.product)} >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
            }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                                <h2>Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</h2>
                                <h4>Total Price: ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item variant="flush">
                            <Button type="button"
                                    className="btn btn-block" 
                                    disabled={cartItems.length === 0}
                                    onClick={() => checkoutHandler()}>
                                    
                                PROCEED TO CHECKOUT
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
