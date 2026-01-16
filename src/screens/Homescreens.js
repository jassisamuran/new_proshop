import React, { useState, useEffect } from "react";
import products from "../products";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import LOader from "../components/Loader";

// import axios from 'axios'
import { listProduct } from "../actions/productActions";
import ProductCarousel from "../components/ProductCarousel";
const Homescreens = () => {
  const dispatch = useDispatch();
  // const [product,setproduct]=useState([])
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProduct());

    // const fetchProducts=async()=>{
    //   const {data}=await axios.get('/api/products')
    //   setproduct(data)
    // }
    // fetchProducts()
  }, [dispatch]);
  // const products=[]
  return (
    <>
      <ProductCarousel />
      <h1>Latest Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <Message variant="danger"></Message>
      ) : (
        <Row>
          {products.map((products) => (
            <Col key={products._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={products} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homescreens;
