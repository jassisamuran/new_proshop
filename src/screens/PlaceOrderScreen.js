import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ReactLocation, Router } from 'react-location'
import {useNavigate,Link} from 'react-router-dom'
import {Form,Row,Col,Button,ListGroup,Image,Card} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
const PlaceOrderScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    console.log(cart)
    const adddecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed
    }
    cart.itemsPrice=(cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
    cart.shippingPrice=(cart.itemsPrice > 100 ? 0 : 100);
    cart.taxPrice=Number((0.15 * cart.itemsPrice).toFixed(2))
    
    
    cart.totalPrice=(cart.itemsPrice +
        cart.shippingPrice +
        cart.taxPrice).toFixed(2)
    
    
    const orderCreate=useSelector(state=>state.orderCreate)
    const {order,success,error}=orderCreate
console.log(orderCreate)

    // let content = order.children[0]
        


    useEffect(()=>{
        if(order=== undefined)return;

        if(success ){
            navigate(`/orders/${order.createOrder._id}`)
            

        }
        // eslint-disable-next-line 
    },[navigate,success])

    const placeholderHandler=()=>{
        dispatch(createOrder({orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:'paypal',
        itemsPrice:cart.itemsPrice,
        shippingPrice:cart.shippingPrice,
        postalcode:cart.postalcode,
        taxPrice:cart.taxPrice,
        totalPrice:cart.totalPrice,
        
        }))
    }
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address:</strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalcode},{' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <strong>Method:</strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ?<Message>Your cart is empty</Message>
                        :(<ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(
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
                                            {item.qty} x ${item.price} =${item.price}
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
                                                            <Col>${cart.itemsPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Shipping</Col>
                                                            <Col>${cart.shippingPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Tax</Col>
                                                            <Col>${cart.taxPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>

                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>Total</Col>
                                                            <Col>${cart.totalPrice}</Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        {error && <Message variant='danger'>{error}</Message>}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Button className='btn-block'
                                                        disabled={cart.cartItems.length===0}
                                                        onClick={placeholderHandler}>
                                                            Place Order
                                                        </Button>
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card>
                                        </Col>
                             
        </Row>
      
    </>
  )
}

export default PlaceOrderScreen