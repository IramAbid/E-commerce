/*
  Warnings:

  - You are about to drop the column `color` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the `Attribute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AttributeSKU` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AttributeSKU" DROP CONSTRAINT "AttributeSKU_attribute_id_fkey";

-- DropForeignKey
ALTER TABLE "AttributeSKU" DROP CONSTRAINT "AttributeSKU_sku_id_fkey";

-- AlterTable
ALTER TABLE "SKU" ADD COLUMN     "attribute_name" TEXT[],
ADD COLUMN     "attribute_value" TEXT[];

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "color";

-- DropTable
DROP TABLE "Attribute";

-- DropTable
DROP TABLE "AttributeSKU";
