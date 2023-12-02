 import React,{useEffect} from 'react'


import {Link} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Card,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { getOrderDetails,deliverOrder} from '../actions/orderActions'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import { ORDER_DELIVERED_RESET } from '../constants/orderConstansts'

const OrderScreen = ({}) => {
    
    const dispatch=useDispatch()
   const {id}=useParams()
   console.log('this is id')
    console.log(id);

    const orderDetail=useSelector((state)=>state.orderDetail)
    const {order,loading,error}=orderDetail
    const orderDeliver=useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver}=orderDeliver
    console.log(successDeliver)
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin
    console.log(userInfo)
    useEffect(()=>{
    
        if(!order ||successDeliver){
            dispatch({type:ORDER_DELIVERED_RESET})
            dispatch(getOrderDetails(id))}
            
        },[dispatch,id,successDeliver,order])
    console.log(orderDetail)
    // if(loading===false){
        // order.itemsPrice=(order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
        // }
// console.log(order)
        const deliveredHandler=()=>{
            dispatch(deliverOrder(order))
        }


  return loading?<Loader/>:error?<Message variant='danger'>{error}</Message>
  :<><h1>Order {order._id}</h1>
  <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                        <strong>Name: </strong>{order.user.name}
                        </p>
                        <p>
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalcode},{' '}
                            {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>:
                        <Message variant='danger'>Not Delivered</Message>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>:
                        <Message variant='danger'>Not paid</Message>
                        }
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ?<Message>Order is empty</Message>
                        :(<ListGroup variant='flush'>
                            {order.orderItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name}
                                             fluid rounded/>
                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} =${item.qty*item.price}
                                        </Col>
                                        </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>)}
                    </ListGroup.Item>
                </ListGroup>
            </Col> 
                                        <Col md={4}>
                                            <Card>
                                                <ListGroup variant='flush'>
                                                    <ListGroup.Item>
                                                        <h2>Order Summary</h2>

                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Items</Col>
                                                            {/* <Col>${order.itemsPrice}</Col> */}
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Shipping</Col>
                                                            <Col>${order.shippingPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Tax</Col>
                                                            <Col>${order.taxPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Total</Col>
                                                            <Col>${order.totalPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    {loadingDeliver && <Loader/>}
                                                   {userInfo.name==="Admin User" && order.isPaid && !order.isDelivered &&
                                                   (<ListGroup.Item>
                                                    <Button type='button' className='btn btn-block'
                                                     onClick={deliveredHandler}>Mark as Delivered</Button>
                                                   </ListGroup.Item>)} 
                                                </ListGroup>
                                            </Card>
                                        </Col>
                             
        </Row>
  
  </>
  }
export default OrderScreen