import React,{useState,useEffect} from 'react'
import {Link, redirect,useNavigate} from 'react-router-dom'
import { ReactLocation, Router } from 'react-location'
import {Form,Row,Col,Button} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'
const RegisterScreen = ({}) => {
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setpassword]=useState('')
    const [confirmpassword,setConfirmpassword]=useState('')
    const [message,setMessage]=useState(null)
     
    
    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin

    const location = new ReactLocation()
    const redirect=location.search?location.search.split('=')[1]:'/'
    console.log(redirect)
    useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
    },[navigate,userInfo,redirect])
    const dispatch=useDispatch()
    
    const submitHandler =(e)=>{
      e.preventDefault()
        if(password!==confirmpassword){
            setMessage('Password do not match')
        }else dispatch(register(name,email,password))
    }
    const setPassword=()=>{
      console.log('set password')
    }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {loading &&<Loader/>}
      <Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password </Form.Label>
            <Form.Control type='password' placeholder='Enter password'
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password'
            value={confirmpassword}
            onChange={(e)=>setConfirmpassword(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
            Regiter
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
        Have an Account?{' '}
        <Link to={redirect?`login?redirect=${redirect}`:'/login'}>
          Login
        </Link>
        </Col>
      </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
