/*
  Warnings:

  - You are about to drop the column `slug` on the `services` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "services_slug_key";

-- AlterTable
ALTER TABLE "services" DROP COLUMN "slug",
ADD COLUMN     "category_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "service_categories" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "service_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_categories_slug_key" ON "service_categories"("slug");

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "service_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
