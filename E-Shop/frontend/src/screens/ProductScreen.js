import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductDetail} from '../action/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

import axios from 'axios'

function ProductScreen({match, history}) {
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    useEffect(() => {
        dispatch(listProductDetail(match.params.id))
    }, [])

    const adToCartHandler = () => {
        history.push(`/cart/${match.params.id}?quantity=${quantity}`)
    }
    
    return (
        <div>
            <Link to="/" className="btn btn-light my-3">Back</Link>
            {
                loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                :(
                    <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {product.name}
                        </ListGroup.Item>
    
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color="#f8e825"/>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        ${product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>quantity</Col>
                                            <Col xs='auto' className='my-1'>
                                                <Form
                                                as='select'
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                >
                                                {
                                                    [...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                                </Form>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ) 
                            }

                            <ListGroup.Item>
                                <Button onClick={adToCartHandler} className="btn-block" disabled={product.countInStock == 0} type="button">Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
                )
            }
            
        </div>
    )
}

export default ProductScreen
