import { Router } from "express";
import productControllers from "../controllers/productController.js";

const router = Router();


//routes for adding a product only (not variant)
router.post('/product-new',productControllers.addProduct);

//route to update a product only (not variants)
  router.put('/product-update/:id',productControllers.updateProduct);
  
//route to get a product along with its variants
router.get('/product-get/:id',productControllers.getSingleProduct);

export default router;
