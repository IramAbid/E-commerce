/*
  Warnings:

  - You are about to drop the column `attribute_value` on the `AttributeSKU` table. All the data in the column will be lost.
  - Added the required column `attribute_value` to the `Attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attribute" ADD COLUMN     "attribute_value" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AttributeSKU" DROP COLUMN "attribute_value";
