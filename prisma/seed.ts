import { prisma } from "../src/lib/prisma";
import { hashPassword } from "../src/server/security/password";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@inacioscertify.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "G7DI3IejGnXbp-8U";

  // 1. Evento Principal
  const event = await prisma.event.upsert({
    where: { slug: "portfolio-comunique-2026" },
    update: {
      name: "Portfólio Comunique — Imagem como Património",
      description: "Evento oficial sobre reputação, comunicação e imagem corporativa.",
      startsAt: new Date("2026-10-08T08:30:00.000Z"),
      checkinOpensAt: new Date("2026-10-08T00:00:00.000Z"),
      checkinClosesAt: new Date("2026-10-08T23:59:59.000Z"),
      timezone: "Africa/Luanda",
    },
    create: {
      slug: "portfolio-comunique-2026",
      name: "Portfólio Comunique — Imagem como Património",
      description: "Evento oficial sobre reputação, comunicação e imagem corporativa.",
      startsAt: new Date("2026-10-08T08:30:00.000Z"),
      checkinOpensAt: new Date("2026-10-08T00:00:00.000Z"),
      checkinClosesAt: new Date("2026-10-08T23:59:59.000Z"),
      timezone: "Africa/Luanda",
      checkinMode: "AUTO",
    },
  });

  console.log("✅ Evento inicializado:", event.name);

  // 2. Administrador Inicial
  const passwordHash = await hashPassword(adminPassword);
  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: "Administrador Ekanda",
      passwordHash,
    },
    create: {
      email: adminEmail,
      name: "Administrador Ekanda",
      passwordHash,
    },
  });

  console.log("✅ Administrador inicial criado:", admin.email);
}

main()
  .catch((e) => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
