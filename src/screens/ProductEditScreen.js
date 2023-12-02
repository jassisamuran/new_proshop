import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Link, redirect,useNavigate} from 'react-router-dom'
import {Form,Row,Col,Button, NavItem,File} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { useParams} from 'react-router'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {listProductDetails,updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
const ProductEditScreen = ({}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {id}=useParams()
    // console.log(id)
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [image,setImage]=useState('')
    const [brand,setBrand]=useState('')
    const [category,setCategory]=useState('')
    const [countInStock,setCountInStock]=useState('')
    const [description,setDescription]=useState('')
    const [uploading,setUploading]=useState(false)
    
    
    const productDetails=useSelector((state)=>state.productDetails)
    const {loading,error,product}=productDetails
    

    const productUpdate=useSelector((state)=>state.productUpdate)
    const {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate
    // console.log(successUpdate)
    useEffect(()=>{
      if(successUpdate){
        console.log('called')
        dispatch({type:PRODUCT_UPDATE_RESET});
        navigate('/admin/productlist');
      }else{
    if(!product.name || product._id!==id){
      dispatch(listProductDetails(id))
    }else
    {

      // console.log('this is st data')
      // console.log(product.name)
      setName(product.name)
      setPrice(product.price)
      setDescription(product.description)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setImage(product.image)  
    }}
    }
    ,[dispatch,id,navigate,product,successUpdate])
    
    const handleChange=async (e)=>{
      const file=e.target.files[0];
      // setImage(e.target.files[0])
      const formData=new FormData();
      formData.append('image',file)
      console.log(formData)
      setUploading(true)
      try{
        const config={
          headers:{
            'Content-Type':'mutipart/form-data'
          }
        }
        const {data}=await axios.post('/api/upload',formData,config)
        setImage(data)
        setUploading(false)
      }catch(err){
        console.log(err)
         setUploading(false);

      }
    }
    const submitHandler =(e)=>{
      e.preventDefault()
      dispatch(
      updateProduct({
        _id:id,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,

      })
    )

    }
    const setPassword=()=>{
      console.log('set password')
    }
  //   function handleChange(e) {
  //     console.log(e.target.files);
  //     setImage(URL.createObjectURL(e.target.files[0]));
  // }
  return (
    <>
    <Link to='/admin/productlist' className='btn btn-light my-3'>Go back</Link>
    
    <FormContainer>
      <h1>Edit Product</h1>
      {/* {loadingUpdate &&<Loader/>} */}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
      (
        <Form onSubmit={submitHandler}>

      <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        
        <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control type='number' placeholder='Enter Price'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            
            ></Form.Control>
        </Form.Group>

        {/* <Form.Group controlId='image'>
            <Form.Control type='text'
            placeholder='enter image url'
            value={image}
            onChange={(e)=>setImage(e.target.value)}
            ></Form.Control>
            <Form.File  id='image-file'label='choose file'
            custom onChange={handleChange}>

            </Form.File>
            {uploading &&<Loader/>}
      </Form.Group> */}


        
           <input type="file" onChange={handleChange}  />
            <img src={image} />
             

         
        {uploading &&<Loader/>}
        <Form.Group controlId='brand'>
            <Form.Label>Brand </Form.Label>
            <Form.Control type='text'label='Enter brand'
            value={brand}
            onChange={(e)=>setBrand(e.target.value)}
            
            ></Form.Control>

        </Form.Group>

        <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control type='number' placeholder='Enter countInStock'
            value={countInStock}
            onChange={(e)=>setCountInStock(e.target.value)}
            
            ></Form.Control>
        </Form.Group>


        <Form.Group controlId='category'>
            <Form.Label>Category </Form.Label>
            <Form.Control type='text'label='Enter category'
            value={category}    
            onChange={(e)=>setCategory(e.target.value)}
            
            ></Form.Control>

        </Form.Group>


        <Form.Group controlId='description'>
            <Form.Label>Description </Form.Label>
            <Form.Control type='text'label='Enter description'
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            
            ></Form.Control>

        </Form.Group>


        <Button type='submit' variant='primary'>
            submit
        </Button>
      </Form>


      )}
      
      
    </FormContainer>
    </>
  )
}

export default ProductEditScreen
