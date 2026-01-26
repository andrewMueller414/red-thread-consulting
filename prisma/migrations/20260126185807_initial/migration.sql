-- CreateEnum
CREATE TYPE "PriorityId" AS ENUM ('GROWTH', 'FINANCIAL_INDEPENDENCE', 'COMMITTMENT', 'IMPACT', 'GIVING_BACK', 'SOCIAL_WELFARE');

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "formId" TEXT NOT NULL,
    "ctime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewed_at" TIMESTAMP(3),

    CONSTRAINT "FormResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MdxContent" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "formId" TEXT,
    "ctime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MdxContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MdxContent_id_key" ON "MdxContent"("id");
