-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "provider" TEXT,
ALTER COLUMN "phone" DROP NOT NULL;
