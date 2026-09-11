-- CreateIndex
CREATE INDEX "todos_status_due_at_idx" ON "todos"("status", "due_at");

-- CreateIndex
CREATE INDEX "todos_remove_from_today_at_idx" ON "todos"("remove_from_today_at");
