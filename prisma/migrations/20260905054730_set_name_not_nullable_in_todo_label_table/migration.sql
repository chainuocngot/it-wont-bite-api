/*
  Warnings:

  - Made the column `name` on table `todo_labels` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "todo_labels" ALTER COLUMN "name" SET NOT NULL;
