import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import path from 'node:path';
import fs from 'node:fs';

export const runtime = 'nodejs';

const DOWNLOAD_FILES: Record<string, string> = {
  authforge: 'authforge-v1.0.0.zip',
  starter: 'nextjs-professional-starter-v0.1.0.zip',
};

export async function GET(request: Request, context: { params: Promise<{ productId: string }> }) {
  try {
    const { productId } = await context.params;

    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 400 });
    }

    const license = await prisma.license.findFirst({
      where: {
        productId,
        downloadToken: token,
        status: 'ACTIVE',
      },
    });

    if (!license) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    if (license.downloadTokenExpiresAt && license.downloadTokenExpiresAt < new Date()) {
      return NextResponse.json({ error: 'Download link expired' }, { status: 403 });
    }

    const storageFilename = DOWNLOAD_FILES[productId] ?? `${productId}.zip`;
    const filePath = path.resolve(process.cwd(), 'private', storageFilename);

    console.log('Download path:', filePath);

    if (!fs.existsSync(filePath)) {
      console.error('File not found at:', filePath);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${storageFilename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
