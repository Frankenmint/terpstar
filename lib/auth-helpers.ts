import { Account, User } from "next-auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function linkOrCreateUser(user: User, account: Account | null): Promise<boolean> {
  if (!user.email || !account?.provider || !account?.providerAccountId) return false;

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
    include: { accounts: true },
  });

  if (existingUser) {
    const alreadyLinked = existingUser.accounts.find(
      (acc) =>
        acc.provider === account.provider &&
        acc.providerAccountId === account.providerAccountId
    );

    if (!alreadyLinked) {
      await prisma.account.create({
        data: {
          userId: existingUser.id,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type ?? "oauth",
          access_token: account.access_token ?? "",
          token_type: account.token_type,
          scope: account.scope ?? "",
        },
      });
    }

    return true;
  }

  await prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      image: user.image,
      accounts: {
        create: {
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          type: account.type ?? "oauth",
          access_token: account.access_token ?? "",
          token_type: account.token_type,
          scope: account.scope ?? "",
        },
      },
    },
  });

  return true;
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: { accounts: true },
  });
}