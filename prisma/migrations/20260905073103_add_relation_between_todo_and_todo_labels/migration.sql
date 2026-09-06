-- CreateTable
CREATE TABLE "_TodoToTodoLabel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TodoToTodoLabel_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TodoToTodoLabel_B_index" ON "_TodoToTodoLabel"("B");

-- AddForeignKey
ALTER TABLE "_TodoToTodoLabel" ADD CONSTRAINT "_TodoToTodoLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "todos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TodoToTodoLabel" ADD CONSTRAINT "_TodoToTodoLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "todo_labels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
