/*
  Warnings:

  - A unique constraint covering the columns `[downloadToken]` on the table `License` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "downloadToken" TEXT,
ADD COLUMN     "downloadTokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "License_downloadToken_key" ON "License"("downloadToken");
