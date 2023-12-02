import React,{useEffect}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link,useNavigate } from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import { addToCart, removefromcart } from '../actions/cartActions'
import { useParams } from 'react-router'
import { CART_ADD_ITEMS } from '../constants/cartConstants'

const Cart = ({}) => {
    
    const {id,qty} = useParams()
      const dispatch=useDispatch()
      const cart=useSelector((state)=>state.cart)
      const {cartItems}=cart
      console.log(id)
      // console.log(qty)
      const navigate=useNavigate()
      useEffect(()=>{
        
        if(id &&qty!==undefined){
          dispatch(addToCart(id,qty))
        }
        if(id){
          dispatch(addToCart(id))
        }
      },[dispatch,id,qty])

const removecartHandler =(id)=>{
  dispatch(removefromcart(id))
  console.log(id)
}
const checkouthandler=()=>{
  console.log('checkout')
  navigate(`/shipping `)
}
    return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length===0?<Message>Your cart is empty <Link to ='/'>Go back</Link></Message>
        :(<ListGroup variant='flush'>
          {cartItems.map(item=>(
            <ListGroupItem key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounder />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control as='select' value={qty} onChange={(e)=>
                              dispatch(addToCart(item.product,Number(e.target.value)))}>
                                {
                                [...Array(item.countInStock).keys()].map((x)=>(
                                  <option key={x+1} value={x+1}>
                                    {x+1}
                                  </option>
                                ))}
                              </Form.Control>
                </Col>
                <Col md={2}>
                  <Button type='button' variant='light' onClick={()=>
                    removecartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                </Col>
              </Row>

            </ListGroupItem>
          ))}
        </ListGroup>)}



      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal 
                   ({cartItems.reduce((acc, item)  => Number( acc + item.qty), 0)})
                 items</h2>
                <h2>
                  ({cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)})
                </h2>
              </ListGroup.Item>
              <ListGroupItem>
                <Button type='button' className='btn-block' disabled={cartItems.length===0}
                onClick={checkouthandler}>Proceed to Cart</Button>
              </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  )
}

export default Cart