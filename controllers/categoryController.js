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

export default {addCategory}