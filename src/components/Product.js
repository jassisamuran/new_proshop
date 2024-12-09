import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  const main = "http://localhost:5000";
  const next = product.image;
  const fullPath = `${main}/${next}`;
  // console.log(fullPath);
  return (
    <Card className="my-3 p-3 rounded">
      {/* <h1>{product._id}</h1> */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={fullPath} variant="top" className="product-image" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text ad="div">
        <Rating>
          value={product.rating} text={`{product.numReviews} reviews`}
        </Rating>
      </Card.Text>

      <Card as="text">${product.price}</Card>
      {/* <h1>{product._id}</h1> */}
    </Card>
  );
};

export default Product;
