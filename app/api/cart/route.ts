import { NextResponse } from 'next/server';
import { initORM } from '../../../lib/orm';
import { Cart } from '../../../models/Cart';
import { Product } from '../../../models/Product';

export async function POST(req: Request) {
  const { productId, quantity } = await req.json();
  const orm = await initORM();
  const em = orm.em.fork();

  const product = await em.findOne(Product, { id: productId });
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Check if item already exists in cart
  let cartItem = await em.findOne(Cart, { product });

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cartItem = em.create(Cart, { product, quantity });
  }

  await em.persistAndFlush(cartItem);

  return NextResponse.json({ message: 'Added to cart' });
}
