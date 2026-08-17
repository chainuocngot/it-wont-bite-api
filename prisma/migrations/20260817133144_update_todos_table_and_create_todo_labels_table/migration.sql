-- CreateEnum
CREATE TYPE "TodoLabelColor" AS ENUM ('Blue', 'Red', 'Yellow', 'Green', 'Purple', 'Pink', 'Orange');

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "description" TEXT,
ADD COLUMN     "due_at" DATE,
ADD COLUMN     "remind_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "todo_labels" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "color" "TodoLabelColor" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_labels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "todo_labels_name_key" ON "todo_labels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "todo_labels_color_key" ON "todo_labels"("color");
