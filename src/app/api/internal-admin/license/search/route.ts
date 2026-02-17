import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const orders = await prisma.order.findMany({
    where: {
      buyerEmail: email,
    },
    include: {
      license: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({ orders });
}
