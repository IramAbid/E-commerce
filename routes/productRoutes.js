import { Router } from "express";
import productControllers from "../controllers/productController.js";

const router = Router();

//routes for adding a resource
router.post("/category/add", productControllers.addCategory);
router.post("/product/add", productControllers.addProduct);
router.post("/product/variant/add", productControllers.addVariant);
router.post("/product/variant/sku", productControllers.addSKU);

//routes for updating a resource

export default router;
