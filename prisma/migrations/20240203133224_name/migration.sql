/*
  Warnings:

  - You are about to drop the `ProductNew` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariantNew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VariantNew" DROP CONSTRAINT "VariantNew_product_id_fkey";

-- DropForeignKey
ALTER TABLE "_categories" DROP CONSTRAINT "_categories_B_fkey";

-- DropTable
DROP TABLE "ProductNew";

-- DropTable
DROP TABLE "VariantNew";

-- CreateTable
CREATE TABLE "product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT,
    "product_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "variant" (
    "variant_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "variant_name" TEXT NOT NULL,
    "attribute_name" TEXT[],
    "attribute_value" TEXT[],
    "additional_cost" DOUBLE PRECISION[],
    "stock_count" INTEGER[],
    "SKU" TEXT NOT NULL,

    CONSTRAINT "variant_pkey" PRIMARY KEY ("variant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_product_id_key" ON "product"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "variant_variant_id_key" ON "variant"("variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "variant_SKU_key" ON "variant"("SKU");

-- AddForeignKey
ALTER TABLE "variant" ADD CONSTRAINT "variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
