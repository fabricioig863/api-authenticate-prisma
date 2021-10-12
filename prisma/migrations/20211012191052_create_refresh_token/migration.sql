-- CreateTable
CREATE TABLE "token_autorization" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "token_autorization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "token_autorization_userId_key" ON "token_autorization"("userId");

-- AddForeignKey
ALTER TABLE "token_autorization" ADD CONSTRAINT "token_autorization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
