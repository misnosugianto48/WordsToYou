-- CreateTable
CREATE TABLE "contents" (
    "id" TEXT NOT NULL,
    "recipient_name" TEXT NOT NULL,
    "word_sent" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);
