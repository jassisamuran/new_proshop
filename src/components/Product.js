import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      {/* <h1>{product._id}</h1> */}
      <Link to={`https://gg-6702.onrender.com/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
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
