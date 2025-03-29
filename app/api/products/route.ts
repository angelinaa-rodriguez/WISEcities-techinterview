import { NextResponse } from 'next/server';
import { initORM } from '../../../lib/orm';
import { Product } from '../../../models/Product';

export async function GET() {
  try {
    const orm = await initORM();
    const em = orm.em.fork();
    const products = await em.find(Product, {});
    return NextResponse.json(products);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
