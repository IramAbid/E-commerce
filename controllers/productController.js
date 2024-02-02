import prisma from "../prisma/client/client.js";

async function addCategory(req, res) {
  const categoryName = req.body.name;
  const description = req.body.description;

  try {
    const addCategory = await prisma.category.create({
      data: {
        name: categoryName,
        description: description,
      },
    });

    return res.status(201).json(addCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add a category" });
  }
}
async function addProduct(req, res) {
    const categoryId = req.body.categoryId;
    const productName=req.body.productName;
    const description = req.body.description;
    const productPrice = req.body.productPrice;
    try {
      const addedProduct = await prisma.product.create({
        data: {
          product_name: productName,
          description: description,
          product_price: productPrice,
          categories: {
            connect: { id: categoryId },
          },
        },
      });
      return res.status(201).json(addedProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to add a product" });
    }
  } 

  async function addVariant(req,res) {
    const productId= req.body.productId;
    const color=req.body.color;
    const additionalCost = req.body.additionalCost;
    try {
      const addedVariant = await prisma.variant.create({
        data: {
          color: color,
          additional_cost: additionalCost,
          product: {
          connect: { product_id: productId },
          },
        },
      });
    
      return res.status(201).json(addedVariant);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to add a variant" });
    }
} 

const addSKU = async (req, res) => {
  try {
    const { variantId, productId, attributeNames, attributeValues } = req.body;

    if (!attributeNames || !attributeValues) {
      return res.status(400).json({
        error: "Both attributeNames and attributeValues arrays are required",
      });
    }

    if (attributeNames.length !== attributeValues.length) {
      return res.status(400).json({
        error: "The number of attribute names and values must match",
      });
    }

    const newSKU = await prisma.sKU.create({
      data: {
        product_id: productId,
        variant: {
          connect: { variant_id: variantId },
        },
        attribute_name: attributeNames,
        attribute_value: attributeValues,
      },
    });

    res.status(201).json(newSKU);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating SKU" });
  }
};
  
// const addSKU = async (req, res) => {
//     try {
//       const { variantId, productId, attributes } = req.body;
  
//       const newSKU = await prisma.sKU.create({
//         data: {
//           product_id: productId,
//           variant_id: variantId,
//           attributes: {
//             create: attributes,
//           },
//         },
//       });
  
//       res.status(201).json(newSKU);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Error creating SKU" });
//     }
//   };


export default {addCategory,addProduct,addVariant,addSKU};