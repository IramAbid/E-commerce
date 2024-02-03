import { Router } from "express";
import variantControllers from "../controllers/variantControllers.js";

const router = Router();

//route to add a variant to a product
router.post("/product/:id/variant-add", async (req, res) => {
    const productId = req.params.id;
    return variantControllers.addVariantsToProduct(req, res, productId);
  });

//route to delete a variant of a product 
  router.delete('/product/variant-delete/:id',variantControllers.deleteProductVariant);

//route to update a variant of a product
  router.put('/product/variant-update/:id',variantControllers.updateVariant);
 
  export default router;