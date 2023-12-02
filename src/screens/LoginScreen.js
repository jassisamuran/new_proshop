import React,{useState,useEffect} from 'react'
import {Link, redirect,useNavigate} from 'react-router-dom'
import { ReactLocation, Router } from 'react-location'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const LoginScreen = ({}) => {
    const navigate=useNavigate()

    const [email,setEmail]=useState('')
    const [password,setpassword]=useState('')
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin

    const location = new ReactLocation()
    const redirect=location.search?location.search.split('=')[1]:'/'
    useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
    },[navigate,userInfo,redirect])
    const dispatch=useDispatch()
    
    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(login(email,password))
    }
    const setPassword=()=>{
      console.log('set password')
    }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading &&<Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password Address</Form.Label>
            <Form.Control type='password' placeholder='Enter password'
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            
            ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
            Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
        New Customer?{' '}
        <Link to={'/register'}>
          Register
        </Link>
        </Col>
      </Row>
      
    </FormContainer>
  )
}

export default LoginScreen
