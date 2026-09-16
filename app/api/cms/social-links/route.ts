import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth-middleware';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// GET — Public: fetch all social media links
export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany({
            where: { section: 'social', isActive: true },
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(settings);
    } catch (error: unknown) {
        console.error('Error fetching social links:', error);
        return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
    }
}

// PUT — Admin only: bulk upsert social links
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
                isActive?: boolean;
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
                        section_key: { section: 'social', key: item.key },
                    },
                    update: {
                        valueAr: item.valueAr,
                        valueEn: item.valueEn,
                        extra: item.extra ?? null,
                        order: item.order ?? 0,
                        isActive: item.isActive ?? true,
                    },
                    create: {
                        section: 'social',
                        key: item.key,
                        valueAr: item.valueAr,
                        valueEn: item.valueEn,
                        extra: item.extra ?? null,
                        order: item.order ?? 0,
                        isActive: item.isActive ?? true,
                    },
                })
            )
        );

        // Deactivate any social keys NOT in the submitted list
        const submittedKeys = items.map((i) => i.key);
        await prisma.siteSetting.updateMany({
            where: {
                section: 'social',
                key: { notIn: submittedKeys },
            },
            data: { isActive: false },
        });

        revalidatePath('/', 'layout');

        return NextResponse.json(results);
    } catch (error: unknown) {
        console.error('Error updating social links:', error);
        return NextResponse.json({ error: 'Failed to update social links' }, { status: 500 });
    }
}
