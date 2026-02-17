import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import path from 'node:path';
import fs from 'node:fs';

export const runtime = 'nodejs';

export async function GET(request: Request, { params }: { params: { productId: string } }) {
  const { productId } = params;

  const url = new URL(request.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Missing email' }, { status: 400 });
  }

  const license = await prisma.license.findFirst({
    where: {
      productId,
      email,
      status: 'ACTIVE',
    },
  });

  if (!license) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), 'private', `${productId}.zip`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${productId}.zip"`,
    },
  });
}
