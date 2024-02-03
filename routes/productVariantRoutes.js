import { Router } from "express";
import productVariantControllers from "../controllers/productVariantController.js";

const router = Router();

//route to create a product with variants
router.post('/product-variant-add', productVariantControllers.addProductWithVariants);

//route to get products along with its variants
router.get('/product-get',productVariantControllers.getProducts);

//route to update a product with its variants
router.put('/product-variant-update/:id', productVariantControllers.updateProductWithVariants);

//route to delete products,existing variants of product will also delete 
router.delete('/product-delete/:id',productVariantControllers.deleteProduct);

//route to search a product using a keyword, if keyword matches variant name then it returns product with only that variant otherwise all variants are returned with product 
router.get('/product-search',productVariantControllers.searchProducts);

export default router;