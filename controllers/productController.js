import prisma from "../prisma/client/client.js";

//function to add a product only

async function addProduct(req, res) {
  const productName = req.body.productName;
  const description = req.body.description;
  const productPrice = req.body.productPrice;

  try {
    const addedProduct = await prisma.product.create({
      data: {
        productName: productName,
        description: description,
        productPrice: productPrice,
      },
    });

    res.status(201).json(addedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

//function to update a product
async function updateProduct(req, res) {
  const id = req.params.id;
  const productName=req.body.productName;
  const description=req.body.description;
  const productPrice = req.body.productPrice;

  try {
      const product = await prisma.product.findUnique({
          where: {
              productId: Number(id), // Use product_id here
          },
      });

      // check if product exists
      if (!product) {
          throw new Error("Product not found");
      }
      const updatedData = {
        productName: productName,
        description: description,
        productPrice: productPrice,
    };
      const updatedProduct = await prisma.product.update({
          where: {
              productId: Number(id),
          },
          data: {
              productName: productName,
              description: description,
              productPrice: productPrice,
          },
          
      });
      return res.status(200).json(updatedProduct);
  } catch (err) {
      console.error(err);
      res.status(500).json({
          error: true,
          message: err.message,
      });
  }
}

//function to get a single product with its variant

  async function getSingleProduct(req, res) {
    const id= req.params.id;
    try {
        const products = await prisma.product.findMany({
           where: {
            productId: Number(id),
           },
            select: {
                productId: true,
                description: true,
                productName: true,
                variants: {
                    select: {
                        variantId: true,
                        variantName: true,
                        attributeName: true,
                        attributeValue: true,
                        additionalCost: true,
                        stockCount: true,
                    },
                },
              }
        });
     res.status(201).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching products" });
  }
};


export default {addProduct,updateProduct,getSingleProduct};