import { Router } from "express";
import variantControllers from "../controllers/variantControllers.js";



const router = Router();

router.post("/products/:id/variants", async (req, res) => {
    const productId = req.params.id;
    console.log(`Adding variant to product ${productId}`);
    return variantControllers.addVariantsToProduct(req, res, productId);
  });
  router.delete('/product/variant-delete/:id',variantControllers.deleteProductVariant);
  router.put('/product/variant-update/:id',variantControllers.updateVariant);
 
  export default router;