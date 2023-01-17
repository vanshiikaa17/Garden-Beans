const express = require("express");
const {
  getAllProdcuts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createReviews,
  getReviews,
  deleteReviews,
} = require("../controller/productController");
const { isAuthenticated, authorizedAccess } = require("../middleware/auth");
const router = express.Router();

//get all the products
// router.route("/allproducts").get(getAllProdcuts);
router.route("/allproducts").get(getAllProdcuts);

//add a new product
router
  .route("/admin/allproducts/new")
  .post(isAuthenticated, authorizedAccess("admin"), createProduct);

//update a product
router
  .route("/admin/allproducts/:id")
  .put(isAuthenticated, authorizedAccess("admin"), updateProduct)
  .delete(isAuthenticated, authorizedAccess("admin"), deleteProduct)

router.route("/allproducts/:id").get(getProductDetails);

router.route("/review").put(isAuthenticated, createReviews);

router.route("/allreviews").get(getReviews).delete(isAuthenticated,deleteReviews);

module.exports = router;
