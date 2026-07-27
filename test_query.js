const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mysql://sghaier_user:sghaier_password@127.0.0.1:3308/sghaier_db"
    }
  }
});

async function main() {
  const users = await prisma.user.findMany({
    include: {
      admin: true,
      client: true
    }
  });
  console.log("Users in DB:", JSON.stringify(users, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
