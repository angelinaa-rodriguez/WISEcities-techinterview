import { NextResponse } from 'next/server';
import { initORM } from '../../../../lib/orm';
import { Product } from '../../../../models/Product';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const orm = await initORM();
    const em = orm.em.fork();
    const product = await em.findOne(Product, { id: Number(params.id) });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error('❌ Failed to fetch product:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
