import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table, Tab } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUser } from '../action/userActions'


function UserScreen({history}) {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const dispatch = useDispatch()

    useEffect(() => {
        if(userInfo.isAdmin){
            dispatch(listUser())
        }else{
            history.push('/login')
        }    
    },[dispatch])

    const deleteHandler = (id) => {
        console.log("user delete", id)
    }
    return (
        <div>
            <h1>User List</h1>
            { loading 
                ? (<Loader />) 
                : error 
                ? (<Message variant="danger">{error}</Message>)
                : (
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? (
                                        <i className="fas fa-check" style={{color: 'green'}}></i>
                                    ):(
                                        <i className="fas fa-times" style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`admin/user/${user._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) }
        </div>
    )
}

export default UserScreen
