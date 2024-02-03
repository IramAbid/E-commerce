/*
  Warnings:

  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `product_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `product_name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `product_price` on the `product` table. All the data in the column will be lost.
  - The primary key for the `variant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `additional_cost` on the `variant` table. All the data in the column will be lost.
  - You are about to drop the column `attribute_name` on the `variant` table. All the data in the column will be lost.
  - You are about to drop the column `attribute_value` on the `variant` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `variant` table. All the data in the column will be lost.
  - You are about to drop the column `stock_count` on the `variant` table. All the data in the column will be lost.
  - You are about to drop the column `variant_id` on the `variant` table. All the data in the column will be lost.
  - You are about to drop the column `variant_name` on the `variant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variantId]` on the table `variant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productName` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `variant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variantName` to the `variant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_categories" DROP CONSTRAINT "_categories_B_fkey";

-- DropForeignKey
ALTER TABLE "variant" DROP CONSTRAINT "variant_product_id_fkey";

-- DropIndex
DROP INDEX "product_product_id_key";

-- DropIndex
DROP INDEX "variant_variant_id_key";

-- AlterTable
ALTER TABLE "product" DROP CONSTRAINT "product_pkey",
DROP COLUMN "product_id",
DROP COLUMN "product_name",
DROP COLUMN "product_price",
ADD COLUMN     "productId" SERIAL NOT NULL,
ADD COLUMN     "productName" TEXT NOT NULL,
ADD COLUMN     "productPrice" DOUBLE PRECISION NOT NULL,
ADD CONSTRAINT "product_pkey" PRIMARY KEY ("productId");

-- AlterTable
ALTER TABLE "variant" DROP CONSTRAINT "variant_pkey",
DROP COLUMN "additional_cost",
DROP COLUMN "attribute_name",
DROP COLUMN "attribute_value",
DROP COLUMN "product_id",
DROP COLUMN "stock_count",
DROP COLUMN "variant_id",
DROP COLUMN "variant_name",
ADD COLUMN     "additionalCost" DOUBLE PRECISION[],
ADD COLUMN     "attributeName" TEXT[],
ADD COLUMN     "attributeValue" TEXT[],
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "stockCount" INTEGER[],
ADD COLUMN     "variantId" SERIAL NOT NULL,
ADD COLUMN     "variantName" TEXT NOT NULL,
ADD CONSTRAINT "variant_pkey" PRIMARY KEY ("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "product_productId_key" ON "product"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "variant_variantId_key" ON "variant"("variantId");

-- AddForeignKey
ALTER TABLE "variant" ADD CONSTRAINT "variant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
