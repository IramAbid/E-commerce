import { Router } from "express";
import categoryControllers from "../controllers/categoryController.js";


const router = Router();

//routes for adding a resource
  router.post("/category/add", categoryControllers.addCategory);
  

  export default router;