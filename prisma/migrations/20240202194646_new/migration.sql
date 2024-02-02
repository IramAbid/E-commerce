-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductNew" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "description" TEXT,
    "product_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProductNew_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "VariantNew" (
    "variant_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "attribute_name" TEXT[],
    "attribute_value" TEXT[],
    "additional_cost" DOUBLE PRECISION[],
    "stock_count" INTEGER[],
    "SKU" INTEGER NOT NULL,

    CONSTRAINT "VariantNew_pkey" PRIMARY KEY ("variant_id")
);

-- CreateTable
CREATE TABLE "_categories" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductNew_product_id_key" ON "ProductNew"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "VariantNew_variant_id_key" ON "VariantNew"("variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "VariantNew_SKU_key" ON "VariantNew"("SKU");

-- CreateIndex
CREATE UNIQUE INDEX "_categories_AB_unique" ON "_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_categories_B_index" ON "_categories"("B");

-- AddForeignKey
ALTER TABLE "VariantNew" ADD CONSTRAINT "VariantNew_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "ProductNew"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_categories" ADD CONSTRAINT "_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductNew"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
