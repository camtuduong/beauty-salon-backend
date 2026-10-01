import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const categories = [
    {
      name: 'Hair',
      slug: 'hair',
      isActive: true,
      sortOrder: 0,
    },
    {
      name: 'Nails',
      slug: 'nails',
      isActive: true,
      sortOrder: 1,
    },
    {
      name: 'Skin',
      slug: 'skin',
      isActive: true,
      sortOrder: 2,
    },
  ];

  const services = [
    {
      name: 'Layer Cut',
      price: 250000.0,
      description: 'A layered haircut',
      imageUrl: 'https://picsum.photos/200/300',
      isActive: true,
    },
    {
      name: 'Ultimate Manicure',
      price: 250000.0,
      description: 'A relaxing manicure',
      imageUrl: 'https://picsum.photos/200/300',
      isActive: true,
    },
    {
      name: 'Pedicure',
      price: 250000.0,
      description: 'A soothing pedicure',
      imageUrl: 'https://picsum.photos/200/300',
      isActive: true,
    },
    {
      name: 'Facial',
      price: 250000.0,
      description: 'A rejuvenating facial',
      imageUrl: 'https://picsum.photos/200/300',
      isActive: true,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      create: category,
      update: category,
    });
  }

  for (const service of services) {
    await prisma.service.create({
      data: service,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
