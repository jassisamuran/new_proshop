import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const prouductTop = useSelector((state) => state.prouductTop);

  const { loading, error, products } = prouductTop;
  console.log(prouductTop);
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark" slide={true}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`https://gg-6702.onrender.com/product/${product._id}`}>
            <Image
              src={`http://localhost:5000/${product.image}`}
              alt={product.name}
              fluid
            />
            <Carousel.Caption>
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );

  // <>
  // {products.map(product=>(
  //     <Link to={`/product/${product._id}`}>
  //         <Image src={product.Image} alt={product.name} fluid/>
  //         <h2>{product.name} {product.price}</h2>
  //     </Link>
  // ))}</>)
};

export default ProductCarousel;
