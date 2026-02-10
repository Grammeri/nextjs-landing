import { prisma } from '@authforge/db';

type CreateEntitlementInput = {
  email: string;
  product: string;
  provider: string;
  checkoutSessionId: string;
  access: boolean;
};

export async function getByCheckoutSessionId(checkoutSessionId: string) {
  return prisma.entitlement.findUnique({
    where: { checkoutSessionId },
  });
}

export async function createIfNotExists(
  input: CreateEntitlementInput,
): Promise<{ created: boolean }> {
  try {
    await prisma.entitlement.create({
      data: input,
    });

    return { created: true };
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { created: false };
    }

    throw error;
  }
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code: string }).code === 'P2002'
  );
}

export async function listByEmail(email: string) {
  return prisma.entitlement.findMany({
    where: { email },
    orderBy: { createdAt: 'desc' },
  });
}
