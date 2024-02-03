import prisma from "../prisma/client/client.js";

//function to add a variant of a product
async function addVariantsToProduct(req, res, productId) {

    console.log('Request body:', req.body);
  
    const { variantName, attributeName, attributeValue, additionalCost, stockCount,SKU } = req.body;
  
    if (!variantName || !attributeName || !attributeValue || !additionalCost || !stockCount ||!SKU) {
      console.error('Missing required fields in request body');
      return res.status(400).json({
        error: true,
        message: 'Missing required fields in request body',
      });
    }
  
    if (attributeName.length !== attributeValue.length || attributeName.length !== additionalCost.length || attributeName.length !== stockCount.length) {
      console.error('Mismatched array lengths in request body');
      return res.status(400).json({
        error: true,
        message: 'Mismatched array lengths in request body',
      });
    }
  
    const product = await prisma.product.findUnique({
      where: {
        productId: Number(productId),
      },
    });
  
    if (!product) {
      console.error('Product not found');
      return res.status(404).json({
        error: true,
        message: 'Product not found',
      });
    }
  
    try {
     
      const addedVariant = await prisma.variant.create({
        data: {
          productId: Number(productId),
          variantName:variantName,
          attributeName: attributeName,
          attributeValue: attributeValue,
          additionalCost: additionalCost,
          stockCount: stockCount,
          SKU:SKU,
          },
      });
  
      return res.status(201).json(addedVariant);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  }
  
  
  //delete variant  
  async function deleteProductVariant(req, res) {
    const id = req.params.id;
    try {
        //check if the variant is actually exist
        const variant = prisma.variant.findUnique({
            where: {
                variantId: Number(id)
            }
        })
        
        if (!variant) {
            throw new Error("variant not found")
        }
        console.log(variant);
        //now delete the variant
        const deletedVariant = await prisma.variant.delete({
            where: {
                variantId: Number(id),
            },
        });
  
        res.status(200).json({
            error: false,
            data: deletedVariant,
            message: "Variant deleted successfully"
        })
  
    } catch (err) {
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
  }
  
  //update variant
  async function updateVariant(req, res) {
    const id= req.params.id;
    
    const { variantName, attributeName, attributeValue, additionalCost, stockCount,SKU } = req.body;
  
    if (!variantName || !attributeName || !attributeValue || !additionalCost || !stockCount ||!SKU) {
      console.error('Missing required fields in request body');
      return res.status(400).json({
        error: true,
        message: 'Missing required fields in request body',
      });
    }
  
    if (attributeName.length !== attributeValue.length || attributeName.length !== additionalCost.length || attributeName.length !== stockCount.length) {
      console.error('Mismatched array lengths in request body');
      return res.status(400).json({
        error: true,
        message: 'Mismatched array lengths in request body',
      });
    }
  
    const variant = await prisma.variant.findUnique({
      where: {
        variantId: Number(id),
      },
    });
  
    if (!variant) {
      return res.status(404).json({
        error: true,
        message: 'variant not found',
      });
    }
  
    try {
      const updatedVariant = await prisma.variant.update({
        where: {
        variantId: Number(id),
        },
        data: {
          variantId: Number(id),
          variantName:variantName,
          attributeName: attributeName,
          attributeValue: attributeValue,
          additionalCost: additionalCost,
          stockCount: stockCount,
          SKU:SKU,
          },
      });
  
      return res.status(200).json(updatedVariant);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  }

  
  export default {addVariantsToProduct,deleteProductVariant,updateVariant};