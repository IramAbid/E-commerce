-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT,
    "product_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "variant_id" SERIAL NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'not valid',
    "product_id" INTEGER NOT NULL,
    "additional_cost" DOUBLE PRECISION[],

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("variant_id")
);

-- CreateTable
CREATE TABLE "SKU" (
    "sku_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "variant_id" INTEGER NOT NULL,

    CONSTRAINT "SKU_pkey" PRIMARY KEY ("sku_id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "attribute_id" SERIAL NOT NULL,
    "attribute_name" TEXT NOT NULL,
    "sku_id" INTEGER NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("attribute_id")
);

-- CreateTable
CREATE TABLE "AttributeSKU" (
    "sku_id" INTEGER NOT NULL,
    "attribute_id" INTEGER NOT NULL,

    CONSTRAINT "AttributeSKU_pkey" PRIMARY KEY ("sku_id","attribute_id")
);

-- CreateTable
CREATE TABLE "_categories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_categories_AB_unique" ON "_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_categories_B_index" ON "_categories"("B");

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SKU" ADD CONSTRAINT "SKU_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "Variant"("variant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeSKU" ADD CONSTRAINT "AttributeSKU_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "SKU"("sku_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributeSKU" ADD CONSTRAINT "AttributeSKU_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "Attribute"("attribute_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
