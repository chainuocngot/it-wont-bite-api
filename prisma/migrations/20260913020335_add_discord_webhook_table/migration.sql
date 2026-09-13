-- CreateTable
CREATE TABLE "DiscordWebhook" (
    "id" SERIAL NOT NULL,
    "webhookUrl" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "DiscordWebhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordWebhook_user_id_key" ON "DiscordWebhook"("user_id");

-- CreateIndex
CREATE INDEX "DiscordWebhook_user_id_idx" ON "DiscordWebhook"("user_id");

-- AddForeignKey
ALTER TABLE "DiscordWebhook" ADD CONSTRAINT "DiscordWebhook_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
