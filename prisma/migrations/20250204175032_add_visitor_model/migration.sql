-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL,
    "device" VARCHAR(100) NOT NULL,
    "browser" VARCHAR(100) NOT NULL,
    "ip" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Visitor_pkey" PRIMARY KEY ("id")
);
