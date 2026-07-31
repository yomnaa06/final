const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://sghaier_user:sghaier_password@127.0.0.1:3308/sghaier_db"
    }
  }
});

async function main() {
  const result = await prisma.devis.findMany({
    include: {
      client: {
        select: {
          nom: true,
          telephone: true,
        },
      },
    },
    orderBy: { dateDemande: 'desc' },
  });
  console.log("Success! Found:", result.length, "devis");
}

main().catch(console.error).finally(() => prisma.$disconnect());
