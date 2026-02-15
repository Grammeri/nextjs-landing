-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "providerPaymentIntentId" TEXT,
ADD COLUMN     "termsAccepted" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "termsVersion" TEXT NOT NULL DEFAULT '1.0';
