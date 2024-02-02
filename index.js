
import express from "express";
import config from "./config/config.js";
import productRouter from "./routes/productRoutes.js";
import bodyParser from "body-parser";

const app= express();
app.use(express.json());
app.use(productRouter);

app.get("/",(req,res)=>{
    return res.render("home");
    res.send("API is running...");
});

app.listen(config.PORT || 4000, ()=>{
    console.log(`server running on port http://localhost:${config.PORT}`);
});

app.use(bodyParser.urlencoded({ extended: true }));