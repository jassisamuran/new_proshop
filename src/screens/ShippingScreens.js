import React,{useState,useEffect} from 'react'
import { ReactLocation, Router } from 'react-location'
import {useNavigate} from 'react-router-dom'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
const ShippingScreens = () => {
  const navigate=useNavigate()
  const cart=useSelector(state=>state.cart)
  const {shippingAddress}=cart

  const [city,setCity]=useState(shippingAddress.address)
  const [postalCode,setPostalcode]=useState(shippingAddress.postalCode)
  const [address,setAddress]=useState(shippingAddress.address)
  const [country,setCountry]=useState(shippingAddress.country)

  const dispatch=useDispatch()
  const submitHandler=(e)=>{
    e.preventDefault();
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')
    console.log('submit')
  }

  return (
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter address'
            value={address} required
            onChange={(e)=>setAddress(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='Enter city'
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
            <Form.Label>postal Code</Form.Label>
            <Form.Control type='text' placeholder='Enter postalCode'
            value={postalCode}
            onChange={(e)=>setPostalcode(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control type='country' placeholder='Enter country'
            value={country}
            onChange={(e)=>setCountry(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

          <Button type='submit' variant='primary'>
            Continue
          </Button>

        </Form>
      </FormContainer>
      
  )
}

export default ShippingScreens
