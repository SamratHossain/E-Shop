import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table, Tab } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listProduct, deleteProduct,  createProduct} from '../action/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'


function ProductListScreen({history}) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading : loadingDelete, error : errorDelete, success : successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading : loadingCreate, error : errorCreate, success : successCreate, product : createdProduct} = productCreate

    

    const dispatch = useDispatch()

    let keyword = history.location.search
    
    useEffect(() => {
        dispatch({
            type:PRODUCT_CREATE_RESET
        })

        if(!userInfo.isAdmin){
            history.push('/login')   
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProduct(keyword))
        }
         
    },[dispatch, history, userInfo, successDelete, successCreate, createdProduct, keyword])

    const productCreateHandler = () => {
        dispatch(createProduct()) 
    }

    
    const deleteHandler = (id) => {
        dispatch(deleteProduct(id))
    }
    return (
        <div>
            <Row>
                <Col className='align-items-center'>
                    <h1>Product List</h1>
                </Col>
                <Col className='text-right py-3'>
                    <Button onClick={productCreateHandler}>
                        <i className='fas fa-plus'> Create Product</i>
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {loadingDelete && <Message>{error}</Message>}

            {loadingCreate && <Loader />}
            {loadingCreate && <Message>{error}</Message>}
            
            { loading 
                ? (<Loader />) 
                : error 
                ? (<Message variant="danger">{error}</Message>)
                : (
                    <div>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                    </div>
                ) }
        </div>
    )
}

export default ProductListScreen
