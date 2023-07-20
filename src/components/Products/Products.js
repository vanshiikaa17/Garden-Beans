import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { ProductCard } from "../Home/ProductCard";
import { Loading } from "../layout/loading/Loading";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./product.css";
import ScrollToTop from "../ScrollToTop";
import { Typography } from "@mui/material";
import { Slider } from "@mui/material";
import { MetaData } from "../layout/MetaData";
import { useAlert } from "react-alert";


const Categories=[
  "Outdoor","Indoor", "Flowering", "Leafy", "Seeds", "Trees", "Medicinal"
]

export const Products = () => {
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 2500]);
  
  const [category, setCategory] = useState("");
  
  const [ratings, setRatings] = useState(0);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const dispatch = useDispatch();
  const alert = useAlert();


  const { loading, products, productsCount, productsPerPage, filteredCount, error } =
    useSelector((state) => state.product);
  useEffect(() => {
    if(error){
      console.log(error);
      return alert.error(error);
  }
    dispatch(getProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredCount;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
        <MetaData title="Plants - Garden Beans"/>
          <h2 className="plantheading">Plants</h2>
          <div className="plantsPage">
            <div className="plantsOptions">
              <div className="filterBox">
                <Typography>Filter by Price</Typography>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={2500}
                />
              </div>
              <div className="categoriesPlants">
                <ul className="categoryList">

                
                <Typography>Categories</Typography>
                {category && <p className="selectedCategory">Selected Category : {category}</p>}
                {Categories.map((category)=>(
                  <li
                    className="categoryListItems"
                    onClick={()=>setCategory(category)}
                    key={category}
                  >
                    {category}
                  </li>
                ))}
                </ul>
              </div>

              <div className="ratingsPlants">
                <fieldset>
                  <Typography component="legend">Ratings</Typography>
                  <Slider
                  value={ratings}
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"

                  aria-labelledby="continuous-slider"
                  onChange={(e,rating)=>{
                    setRatings(rating);
                  }}
                  />
                </fieldset>
              </div>
            </div>
            <div className="productlist">
              {products &&
                (
                  products.map((product) => (
                  <ProductCard product={product} key={product._id} />
                 
                ))
                
                )
                }
               
            </div>
          </div>

          <div className="paginationRow">
            <ScrollToTop />
            {productsPerPage < count && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText=">>"
                prevPageText="<<"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
