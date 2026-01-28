/*
  Warnings:

  - You are about to drop the column `formId` on the `FormResponse` table. All the data in the column will be lost.
  - You are about to drop the column `formId` on the `MdxContent` table. All the data in the column will be lost.
  - Added the required column `mdxSourceId` to the `FormResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FormResponse" DROP COLUMN "formId",
ADD COLUMN     "mdxSourceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MdxContent" DROP COLUMN "formId";

-- DropEnum
DROP TYPE "PriorityId";

-- AddForeignKey
ALTER TABLE "FormResponse" ADD CONSTRAINT "FormResponse_mdxSourceId_fkey" FOREIGN KEY ("mdxSourceId") REFERENCES "MdxContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
