import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../layout/loading/Loading";
import { MetaData } from "../layout/MetaData";
import { TopBar } from "./TopBar";
import { BsSpellcheck } from "react-icons/bs";
import { GiCardboardBoxClosed, GiPriceTag } from "react-icons/gi";
import { BiDetail } from "react-icons/bi";
import { RiPlantFill } from "react-icons/ri";
import "./addProduct.css";
import { useAlert } from "react-alert";
import { clearErrors, addProduct } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";
export const AddProduct = () => {
  const { loading, success, error } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState();
  const [imagePreview, setImagePreview] = useState("/addPhoto.png");

  const alert = useAlert();
  const dispatch = useDispatch();
  const nav = useNavigate();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product added successfully");
      nav("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [error, success, dispatch, nav, alert]);

  const Categories = [
    "Outdoor",
    "Indoor",
    "Flowering",
    "Leafy",
    "Seeds",
    "Trees",
    "Medicinal",
  ];

  const addProductSubmitForm = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("stock", stock);
    myForm.set("description", desc);
    myForm.set("category", category);
    myForm.append("images", img);

    dispatch(addProduct(myForm));
  };
  const addImage = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setImg(fileReader.result);
        setImagePreview(fileReader.result);
      }
    };

    fileReader.readAsDataURL(e.target.files[0]);
  };
  return (
    <>
      <MetaData title="Garden Beans - ADMIN - Add Product" />
      {loading ? (
        <Loading />
      ) : (
        <div className="dashBoardContainer">
          <div className="dashboardtopbar dashboardtopbarAddProduct">
            <TopBar />
          </div>

          <div className="addProductContainer">
            <div className="addProductBox">
              <h2>ADD NEW PRODUCT</h2>
              <form
                className="addProductForm"
                encType="multipart/form-data"
                onSubmit={addProductSubmitForm}
              >
                <div className="inputFields">
                  <BsSpellcheck />
                  <input
                    className="addProductInput"
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
                    className="addProductInput"
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
                    className="addProductInput"
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
                    onChange={(e) => setCategory(e.target.value)}
                    className="addProductInput"
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
                    className="addProductInput"
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                    }}
                  />
                </div>
                <div className="addProductImage">
                  {/* <BsFillImageFill /> */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="imgpreview"
                  />

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={addImage}
                  />
                </div>
                <div>
                  {/* {imagePreview.map((img, i)=>(*/
                  /*))} */}
                </div>
                <input
                  type="submit"
                  value="Add Product"
                  className="addProductButton"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
