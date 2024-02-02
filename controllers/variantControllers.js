import prisma from "../prisma/client/client.js";

async function addVariantsToProduct(req, res, productId) {

    console.log('Request body:', req.body);
  
    const { name, attribute_name, attribute_value, additional_cost, stock_count,SKU } = req.body;
  
    if (!name || !attribute_name || !attribute_value || !additional_cost || !stock_count ||!SKU) {
      console.error('Missing required fields in request body');
      return res.status(400).json({
        error: true,
        message: 'Missing required fields in request body',
      });
    }
  
    if (attribute_name.length !== attribute_value.length || attribute_name.length !== additional_cost.length || attribute_name.length !== stock_count.length) {
      console.error('Mismatched array lengths in request body');
      return res.status(400).json({
        error: true,
        message: 'Mismatched array lengths in request body',
      });
    }
  
    const product = await prisma.productNew.findUnique({
      where: {
        product_id: Number(productId),
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
     
      const addedVariant = await prisma.variantNew.create({
        data: {
          product_id: Number(productId),
          name:name,
          attribute_name: attribute_name,
          attribute_value: attribute_value,
          additional_cost: additional_cost,
          stock_count: stock_count,
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
        const variant = prisma.variantNew.findUnique({
            where: {
                variant_id: Number(id)
            }
        })
        
        if (!variant) {
            throw new Error("variant not found")
        }
        console.log(variant);
        //now delete the variant
        const deletedVariant = await prisma.variantNew.delete({
            where: {
                variant_id: Number(id),
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
    
    const { name, attribute_name, attribute_value, additional_cost, stock_count,SKU } = req.body;
  
    if (!name || !attribute_name || !attribute_value || !additional_cost || !stock_count ||!SKU) {
      console.error('Missing required fields in request body');
      return res.status(400).json({
        error: true,
        message: 'Missing required fields in request body',
      });
    }
  
    if (attribute_name.length !== attribute_value.length || attribute_name.length !== additional_cost.length || attribute_name.length !== stock_count.length) {
      console.error('Mismatched array lengths in request body');
      return res.status(400).json({
        error: true,
        message: 'Mismatched array lengths in request body',
      });
    }
  
    const variant = await prisma.variantNew.findUnique({
      where: {
        variant_id: Number(id),
      },
    });
  
    if (!variant) {
      return res.status(404).json({
        error: true,
        message: 'variant not found',
      });
    }
  
    try {
      const updatedVariant = await prisma.variantNew.update({
        where: {
        variant_id: Number(id),
        },
        data: {
          variant_id: Number(id),
          name:name,
          attribute_name: attribute_name,
          attribute_value: attribute_value,
          additional_cost: additional_cost,
          stock_count: stock_count,
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