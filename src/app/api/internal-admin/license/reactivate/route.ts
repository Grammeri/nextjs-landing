import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { licenseId } = await request.json();

  await prisma.license.update({
    where: { id: licenseId },
    data: {
      status: 'ACTIVE',
      revokedAt: null,
    },
  });

  return NextResponse.json({ success: true });
}
