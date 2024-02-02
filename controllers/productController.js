import prisma from "../prisma/client/client.js";


async function addProductNew(req, res) {
  const productName = req.body.productName;
  const description = req.body.description;
  const productPrice = req.body.productPrice;

  try {
    const addedProduct = await prisma.productNew.create({
      data: {
        product_name: productName,
        description: description,
        product_price: productPrice,
      },
    });

    res.status(201).json(addedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating product" });
  }
};

// getProduct will return first 5 products with their variants
async function getProducts(req, res) {
    try {
        const products = await prisma.productNew.findMany({
            take: 5,
            select: {
                product_id: true,
                description: true,
                product_name: true,
                variantsNew: {
                    select: {
                        variant_id: true,
                        name: true,
                        attribute_name: true,
                        attribute_value: true,
                        additional_cost: true,
                        stock_count: true,
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

//update 
async function updateProduct(req, res) {
  const id = req.params.id;
  const product_name=req.body.product_name;
  const description=req.body.description;
  const product_price = req.body.product_price;

  try {
      const product = await prisma.productNew.findUnique({
          where: {
              product_id: Number(id), // Use product_id here
          },
      });

      // check if product exists
      if (!product) {
          throw new Error("Product not found");
      }
      const updatedData = {
        product_name: product_name,
        description: description,
        product_price: product_price,
    };
      const updatedProduct = await prisma.productNew.update({
          where: {
              product_id: Number(id), // Use product_id here
          },
          data: {
              product_name: product_name,
              description: description,
              product_price: product_price,
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

//delete product will delete product 
async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        //check if the product is actually exist
        const product = prisma.productNew.findUnique({
            where: {
                product_id: Number(id)
            }
        })

        if (!product) {
            throw new Error("Product not found")
        }

        //now delete the product
        const deletedProduct = await prisma.productNew.delete({
            where: {
                product_id: Number(id),
            },
        });

        res.status(200).json({
            error: false,
            data: deletedProduct,
            message: "Product deleted successfully"
        })

    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
}


export default {addProductNew,updateProduct,deleteProduct,getProducts};