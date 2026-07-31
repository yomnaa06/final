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
    where: { statut: 'EN_ATTENTE' },
    include: {
      client: {
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
    orderBy: { dateDemande: 'asc' },
  });
  console.log("Success! Found:", result.length, "pending devis");
  if (result.length > 0) {
    console.log("First item client:", JSON.stringify(result[0].client, null, 2));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
