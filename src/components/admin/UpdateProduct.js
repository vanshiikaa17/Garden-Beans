import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../layout/loading/Loading";
import { MetaData } from "../layout/MetaData";
import { TopBar } from "./TopBar";
import { BsSpellcheck } from "react-icons/bs";
import { GiCardboardBoxClosed, GiPriceTag } from "react-icons/gi";
import { BiDetail } from "react-icons/bi";
import { RiPlantFill } from "react-icons/ri";
import "./updateProduct.css";
import { useAlert } from "react-alert";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
export const UpdateProduct = () => {
  const { loading, success: updateSuccess, error: updateError } = useSelector(
    (state) => state.newProduct
  );
  const { error, product } = useSelector((state) => state.productDetails);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  // const [img, setImg] = useState();
  const [oldImg, setOldImg] = useState();
  // const [imagePreview, setImagePreview] = useState("/addPhoto.png");

  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDesc(product.description);
      setCategory(product.category);
      setOldImg(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (updateSuccess) {
      alert.success("Product updated successfully");
      nav("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [error, updateSuccess, dispatch, nav, alert, product, id, updateError]);

  const Categories = [
    "Outdoor",
    "Indoor",
    "Flowering",
    "Leafy",
    "Seeds",
    "Trees",
    "Medicinal",
  ];

  const updateProductSubmitForm = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("description", desc);
    myForm.set("category", category);
    // myForm.append("images", img);

    dispatch(updateProduct(id, myForm));
  };
  // const addImage = (e)=>{
  //     const fileReader = new FileReader();

  //   fileReader.onload = () => {
  //     if (fileReader.readyState === 2) {
  //       setImg(fileReader.result);
  //       setImagePreview(fileReader.result);
  //     }
  //   };

  //   fileReader.readAsDataURL(e.target.files[0]);
  // }
  return (
    <>
      <MetaData title="Garden Beans - ADMIN - Add Product" />
      {loading ? (
        <Loading />
      ) : (
        <div className="dashBoardContainer">
          <div className="dashboardtopbar dashboardtopbarupdateProduct">
            <TopBar />
          </div>

          <div className="updateProductContainer">
            <div className="updateProductBox">
              <h2>UPDATE PRODUCT</h2>
              <form
                className="updateProductForm"
                encType="multipart/form-data"
                onSubmit={updateProductSubmitForm}
              >
                <div className="inputFields">
                  <BsSpellcheck />
                  <input
                    className="updateProductInput"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="inputFields">
                  <GiPriceTag />
                  <input
                    className="updateProductInput"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="inputFields">
                  <BiDetail />
                  <textarea
                    className="updateProductInput"
                    rows="5"
                    name="desc"
                    placeholder="Description"
                    value={desc}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </div>
                <div className="inputFields">
                  <RiPlantFill />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="updateProductInput"
                  >
                    <option value="">Choose Category</option>
                    {Categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="inputFields">
                  <GiCardboardBoxClosed />
                  <input
                    className="updateProductInput"
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                  />
                </div>
                <div className="oldProductImage">
                  <img
                    src={oldImg && oldImg.url}
                    alt="Preview"
                    className="imgpreview"
                  />
                </div>

                {/* <div className='updateProductImage'>
                   <img src = {imagePreview} alt = "Preview" className='imgpreview'/>

                  <input
                    type="file"
                    name="avatar"
                    accept='image/*'
                    onChange={addImage}
                  />
                </div> */}
                <div>
                  {/* {imagePreview.map((img, i)=>(*/
                  /*))} */}
                </div>
                <input
                  type="submit"
                  value="Update Product"
                  className="updateProductButton"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
