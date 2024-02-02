import { Router } from "express";
import productControllers from "../controllers/productController.js";



const router = Router();

//routes for adding a resource

  router.post('/product-new',productControllers.addProductNew);
  router.put('/product-update/:id',productControllers.updateProduct);
  router.delete('/product-delete/:id',productControllers.deleteProduct);
  router.get('/product-get',productControllers.getProducts);



export default router;
