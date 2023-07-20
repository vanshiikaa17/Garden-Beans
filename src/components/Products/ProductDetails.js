import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { MetaData } from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  clearErrors,
  getProductDetails,
} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import "./productDetails.css";
import ReactStars from "react-rating-stars-component";
import { DiscussionCard } from "./DiscussionCard";
import { Loading } from "../layout/loading/Loading";
import { addToCart } from "../../actions/cartActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);

  const reviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const increaseQty = () => {
    if (product.stock <= quantity) return;

    const newQty = quantity + 1;
    setQuantity(newQty);
  };
  const decreaseQty = () => {
    if (quantity <= 1) return;

    const newQty = quantity - 1;
    setQuantity(newQty);
  };
  const options = {
    edit: false,
    activeColor: "green",
    size: window.innerWidth < 600 ? 30 : 45,
    value: product.ratings,
    isHalf: true,
  };
  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    alert.success("Item added to cart!");
  };
  const submitReview = () => {
    const myFormData = new FormData();
    myFormData.set("rating", rating);
    myFormData.set("comment", comment);
    myFormData.set("productId", id);

    dispatch(addReview(myFormData));

    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());

      alert.error(error);
    }
    if (reviewError) {
      dispatch(clearErrors());

      alert.error(reviewError);
    }
    if (success) {
      alert.success("Review Added.");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name} - Garden Beans`} />
          <div className="productDetails">
            <div className="productColumns">
              <div className="productimages">
                {/* <Carousel> */}
                {product.images &&
                  
                    <img
                      className="CarouselImage"
                      src={product.images.url}
                      key={product.images.url}
                      alt="Preview"
                    />
                  }
                {/* </Carousel> */}
              </div>
            </div>
            <div className="productColumns">
              <div className="details1">
                <h2>{product.name}</h2>
              </div>
              <div className="details2">
                <ReactStars {...options} />{" "}
                <span>({product.numberOfReviews} Reviews)</span>
              </div>
              <div className="details3">
                <h1>{`₹${product.price}`}</h1>

                <div className="details3-1">
                  <div className="details3-1-1">
                    <button onClick={decreaseQty}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQty}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    className="addToCart"
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>
                <p className="status">
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Out of stock" : " In stock"}
                  </b>
                </p>
              </div>
              <div className="details4">
                <p>
                  <b>Description:</b>
                </p>{" "}
                {product.description}
              </div>

              <button onClick={reviewToggle} className="addReview">
                Submit review
              </button>
            </div>
          </div>
          <div className="reviewContainer">
            <h1 className="Disheading">Reviews and Tips</h1>
            <Dialog
              aria-labelledby="review-dialog"
              open={open}
              onClose={reviewToggle}
            >
              <DialogTitle>Add Tips and Reviews about the plant</DialogTitle>
              <DialogContent className="dialogContent">
                <textarea
                  className="reviewTextArea"
                  cols={window.innerWidth < 850 ? 50 : 70}
                  rows={window.innerWidth < 850 ? 5 : 10}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                  precision={0.5}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={reviewToggle} color="secondary">
                  Cancel
                </Button>
                <Button onClick={submitReview} color="success">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            {product.reviews && product.reviews[0] ? (
              <div className="discussion">
                {product.reviews &&
                  product.reviews.map((r, i) => (
                    <DiscussionCard discussion={r} key={i} />
                  ))}
              </div>
            ) : (
              <p className="noData">Nothing to show</p>
            )}
          </div>
        </>
      )}
    </>
  );
};
