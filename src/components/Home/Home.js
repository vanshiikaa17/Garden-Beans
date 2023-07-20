import React, { useEffect } from "react";
import "./home.css";
import { GiFlowerPot } from "react-icons/gi";
import { ProductCard } from "./ProductCard";
import { MetaData } from "../layout/MetaData";
import { clearErrors, getProducts } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../layout/loading/Loading";
import { useAlert } from "react-alert";
export const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, error, loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if(error){
        dispatch(clearErrors());
        return alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch,error, alert]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="Garden Beans" />

          <div className="banner">
            {/* <h1>HOME</h1> */}
            <h1>Bring home the Magic of Magic beans</h1>
            <a href="#topsellers">
              <button className="btn">
                Explore <GiFlowerPot />
              </button>
            </a>
          </div>
          <div id="topsellers">

          <h3 className="heading">Top Sellers</h3>
          
          <div className="container" id="container">

            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
          </div>
        </>
      )}
    </>
  );
};
