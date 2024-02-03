import express from "express";
import config from "./config/config.js";
import productRouter from "./routes/productRoutes.js";
import variantRouter from "./routes/variantRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productVariantRouter from "./routes/productVariantRoutes.js";
import bodyParser from "body-parser";

const app= express();
app.use(express.json());
app.use(productRouter);
app.use(variantRouter);
app.use(categoryRouter);
app.use(productVariantRouter);

app.get("/",(req,res)=>{
    return res.render("home");
});

app.listen(config.PORT || 4000, ()=>{
    console.log(`server running on port http://localhost:${config.PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));