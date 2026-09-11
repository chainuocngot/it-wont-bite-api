-- AlterEnum
ALTER TYPE "TodoStatus" ADD VALUE 'Overdue';

-- AlterTable
ALTER TABLE "todos" ADD COLUMN     "remove_from_today_at" TIMESTAMP(3);
