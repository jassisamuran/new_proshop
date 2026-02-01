import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";

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
              src={product.image}
              alt={product.name}
              fluid
              width={300}
              height={300}
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
