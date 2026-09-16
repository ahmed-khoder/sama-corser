import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth-middleware';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// GET — Public: fetch all contact info settings
export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany({
            where: { section: 'contact', isActive: true },
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(settings);
    } catch (error: unknown) {
        console.error('Error fetching contact info:', error);
        return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
    }
}

// PUT — Admin only: bulk upsert contact info
export async function PUT(request: NextRequest) {
    try {
        const user = await getUserFromRequest(request);
        if (!user || user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { items } = body as {
            items: Array<{
                key: string;
                valueAr: string;
                valueEn: string;
                extra?: string;
                order?: number;
            }>;
        };

        if (!Array.isArray(items)) {
            return NextResponse.json({ error: 'Invalid payload: items array required' }, { status: 400 });
        }

        // Use a transaction to upsert all items atomically
        const results = await prisma.$transaction(
            items.map((item) =>
                prisma.siteSetting.upsert({
                    where: {
                        section_key: { section: 'contact', key: item.key },
                    },
                    update: {
                        valueAr: item.valueAr,
                        valueEn: item.valueEn,
                        extra: item.extra ?? null,
                        order: item.order ?? 0,
                        isActive: true,
                    },
                    create: {
                        section: 'contact',
                        key: item.key,
                        valueAr: item.valueAr,
                        valueEn: item.valueEn,
                        extra: item.extra ?? null,
                        order: item.order ?? 0,
                        isActive: true,
                    },
                })
            )
        );

        // Also deactivate any contact keys NOT in the submitted list
        const submittedKeys = items.map((i) => i.key);
        await prisma.siteSetting.updateMany({
            where: {
                section: 'contact',
                key: { notIn: submittedKeys },
            },
            data: { isActive: false },
        });

        revalidatePath('/', 'layout');
        revalidatePath('/contact');

        return NextResponse.json(results);
    } catch (error: unknown) {
        console.error('Error updating contact info:', error);
        return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
    }
}
