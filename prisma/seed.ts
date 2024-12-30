import { PrismaClient } from 'prisma/prisma-client';
import { nanoid } from 'nanoid-cjs';

const prisma = new PrismaClient();

async function main() {
  const content1 = await prisma.content.upsert({
    where: { title: 'heart break' },
    update: {},
    create: {
      id: `c-${nanoid(10)}`,
      title: 'heart break',
      recipient_name: 'Jesse Harris',
      word_sent: 'asQhnZkHImXCbkbQiHvN',
    },
  });

  const content2 = await prisma.content.upsert({
    where: { title: 'loving you' },
    update: {},
    create: {
      id: `c-${nanoid(10)}`,
      title: 'loving you',
      recipient_name: 'Jesse Harris',
      word_sent: 'asQhnZkHImXCbkbQiHvN',
    },
  });

  console.log({ content1, content2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
