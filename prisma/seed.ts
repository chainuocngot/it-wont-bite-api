import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from 'prisma/generated/prisma/client';
import { TodoLabelColor, TypeOfTodoLabelColor } from 'src/shared/constants/todo.constant';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const labels: { name: string; color: TypeOfTodoLabelColor }[] = [
    { name: 'Work', color: TodoLabelColor.Blue },
    { name: 'Urgent', color: TodoLabelColor.Red },
    { name: 'Important', color: TodoLabelColor.Yellow },
    { name: 'Personal', color: TodoLabelColor.Green },
    { name: 'Study', color: TodoLabelColor.Purple },
    { name: 'Health', color: TodoLabelColor.Pink },
    { name: 'Other', color: TodoLabelColor.Orange },
  ];

  await prisma.todoLabel.createMany({
    data: labels,
  });

  console.log('Seed data inserted successfully.');
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
