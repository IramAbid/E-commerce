/*
  Warnings:

  - Added the required column `attribute_value` to the `AttributeSKU` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AttributeSKU" ADD COLUMN     "attribute_value" TEXT NOT NULL;
