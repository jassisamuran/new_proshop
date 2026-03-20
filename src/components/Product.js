import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCompareItem } from "../actions/compareActions";
import Rating from "./Rating";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { compareMode, selectedItems } = useSelector(
    (state) => state.compare || false,
  );

  const isSelected = selectedItems.some((items) => items._id === product._id);

  const handleCompareClick = async () => {
    const result = dispatch(toggleCompareItem(product));
    if (!result?.success) {
    }
  };
  // const main = "http://localhost:5000";
  // const main = "https://res.cloudinary.com/dvqxj0tqr";
  // const next = product.image;
  // const fullPath = `${main}/${next}`;
  // console.log(fullPath);

  return (
    <Card className="my-3 p-3 rounded position-relative">
      {compareMode && (
        <div
          style={{
            position: "absolute",
            top: "-10px",
            right: "10px",
            zIndex: 2,
          }}
        >
          <button
            className={`compare-btn-pd rounded border-0 ${
              isSelected ? "compare-btn-active" : ""
            }`}
            onClick={handleCompareClick}
            type="button"
          >
            {isSelected ? "✓" : "+"}
          </button>
        </div>
      )}
      {/* <h1>{product._id}</h1> */}
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="product-image" />
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
