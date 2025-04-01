import { NextResponse, type NextRequest } from 'next/server';
import { initORM } from '../../../../lib/orm';
import { Product } from '../../../../models/Product';

type Context = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params;

    const orm = await initORM();
    const em = orm.em.fork();


    if (!Product) {
      throw new Error('Product entity not found');
    }

    const product = await em.findOne(Product, { id: Number(id) });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error('Failed to fetch product:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
