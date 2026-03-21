import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCompareItem } from "../actions/compareActions";
import Rating from "./Rating";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const { compareMode, selectedItems } = useSelector(
    (state) => state.compare || {},
  );

  const isSelected =
    selectedItems?.some((item) => item._id === product._id) || false;

  const handleCompareClick = () => {
    dispatch(toggleCompareItem(product));
  };

  return (
    <div
      className={`product-card ${isSelected ? "product-card--selected" : ""}`}
    >
      {compareMode && (
        <button
          className={`compare-badge ${isSelected ? "compare-badge--active" : ""}`}
          onClick={handleCompareClick}
          type="button"
        >
          {isSelected ? "✓" : "+"}
        </button>
      )}

      <Link to={`/product/${product._id}`} className="product-image-link">
        <div className="product-image-box">
          <img src={product.image} alt={product.name} className="product-img" />
        </div>
      </Link>

      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>

        <div className="product-rating-row">
          <Rating value={product.rating} />
          <span className="review-count">{product.numReviews} reviews</span>
        </div>

        <div className="product-bottom">
          <span className="product-price">${product.price}</span>
          <Link to={`/product/${product._id}`} className="view-btn">
            View <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
