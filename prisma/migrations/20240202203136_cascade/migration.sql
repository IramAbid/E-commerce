-- DropForeignKey
ALTER TABLE "VariantNew" DROP CONSTRAINT "VariantNew_product_id_fkey";

-- AddForeignKey
ALTER TABLE "VariantNew" ADD CONSTRAINT "VariantNew_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductNew"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
