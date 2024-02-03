
import prisma from "../prisma/client/client.js";

//function to add products with variants 
async function addProductWithVariants(req, res) {
    const productName = req.body.productName;
    const description = req.body.description;
    const productPrice = req.body.productPrice;
    const variants = req.body.variants; // Assuming variants is an array containing variant details
  
    try {
      const addedProduct = await prisma.product.create({
        data: {
          productName: productName,
          description: description,
          productPrice: productPrice,
        },
      });
  
      const productId = addedProduct.productId;
  
      // Call addVariantsToProduct function to add variants
      await addVariantsWithProduct(req, res, productId, variants);
  
      res.status(201).json({ addedProduct, variants });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating product and variants" });
    }
  }
  
  async function addVariantsWithProduct(req, res, productId, variants) {
    try {
      const variantPromises = variants.map(async (variant) => {
        const { variantName, attributeName, attributeValue, additionalCost, stockCount, SKU } = variant;
  
        const addedVariant = await prisma.variant.create({
          data: {
            productId: Number(productId),
            variantName: variantName,
            attributeName: attributeName,
            attributeValue: attributeValue,
            additionalCost: additionalCost,
            stockCount: stockCount,
            SKU: SKU,
          },
        });
  
        return addedVariant;
      });
  
      const addedVariants = await Promise.all(variantPromises);
      return addedVariants;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

 // getProduct will return products with their variants
async function getProducts(req, res) {
    try {
        const products = await prisma.product.findMany({
        
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

 //update product with its variants 
  async function updateProductWithVariants(req, res) {
    const productId = req.params.id;
    const { productName, description, productPrice, variants } = req.body;
  
    try {
      const product = await prisma.product.findUnique({
        where: {
          productId: Number(productId),
        },
      });
  
      // Check if product exists
      if (!product) {
        throw new Error("Product not found");
      }
  
      const updatedProduct = await prisma.product.update({
        where: {
          productId: Number(productId),
        },
        data: {
          productName: productName,
          description: description,
          productPrice: productPrice,
        },
      });
  
      // Update variants for the product
      await updateVariantsForProduct(productId, variants);
  
      return res.status(200).json({ updatedProduct, variants });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  }

  async function updateVariantsForProduct(productId, variants) {
    try {
      const variantPromises = variants.map(async (variant) => {
        const { variantId, name, attributeName, attributeValue, additionalCost, stockCount, SKU } = variant;
  
        const existingVariant = await prisma.variant.findUnique({
          where: {
            variantId: Number(variantId),
          },
        });
  
        // Check if variant exists
        if (!existingVariant) {
          throw new Error(`Variant with id ${variantId} not found`);
        }
  
        const updatedVariant = await prisma.variant.update({
          where: {
            variantId: Number(variantId),
          },
          data: {
            name: name,
            attribute_name: attributeName,
            attribute_value: attributeValue,
            additional_cost: additionalCost,
            stock_count: stockCount,
            SKU: SKU,
          },
        });
  
        return updatedVariant;
      });
  
      await Promise.all(variantPromises);
    } catch (err) {
      console.error(err);
      throw err;
    }
  } 
//delete product will delete product and its variant

async function deleteProduct(req, res) {
    const id = req.params.id;
    try {
        //check if the product is actually exist
        const product = prisma.product.findUnique({
            where: {
                productId: Number(id)
            }
        })

        if (!product) {
            throw new Error("Product not found")
        }

        //now delete the product
        const deletedProduct = await prisma.product.delete({
            where: {
                productId: Number(id),
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


  async function searchProducts(req, res) {
    const searchTerm = req.query.keyword;
  
    if (!searchTerm) {
      return res.status(400).json({
        error: true,
        message: 'Search term is required',
      });
    }
  
    try {
      // Search products by product name or description
      const productsByProduct = await prisma.product.findMany({
        where: {
          OR: [
            {
              productName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          ],
        },
        include: {
          variants: true,
        },
      });
  
      // Search products by variant name
      const productsByVariant = await prisma.product.findMany({
        where: {
          variants: {
            some: {
              variantName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        },
        include: {
          variants: {
            where: {
              variantName: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        },
      });
  
      // Combine the results and remove duplicates
      const allProducts = [...productsByProduct, ...productsByVariant];
      const uniqueProducts = allProducts.filter(
        (product, index, self) =>
          index ===
          self.findIndex(
            (p) => p.productId === product.productId
          )
      );
  
      return res.status(200).json(uniqueProducts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  }
  
  
  export default {deleteProduct,addProductWithVariants,updateProductWithVariants,searchProducts,getProducts};