/*
  Warnings:

  - The values [ADMIN,USER,SUPER_ADMIN] on the enum `ProductXolati` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductXolati_new" AS ENUM ('YANGI', 'YAXSHI', 'YOMON');
ALTER TABLE "Product" ALTER COLUMN "xolati" TYPE "ProductXolati_new" USING ("xolati"::text::"ProductXolati_new");
ALTER TYPE "ProductXolati" RENAME TO "ProductXolati_old";
ALTER TYPE "ProductXolati_new" RENAME TO "ProductXolati";
DROP TYPE "ProductXolati_old";
COMMIT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "image" DROP NOT NULL;
