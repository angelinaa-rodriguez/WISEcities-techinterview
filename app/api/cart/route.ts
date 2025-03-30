// app/api/cart/route.ts
import { NextResponse } from 'next/server';
import { initORM } from '../../../lib/orm';
import { Cart } from '../../../models/Cart';
import { Product } from '../../../models/Product';

export async function POST(request: Request) {
  try {
    const { productId, quantity } = await request.json();

    const orm = await initORM();
    const em = orm.em.fork();

    const product = await em.findOne(Product, { id: productId });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let cartItem = await em.findOne(Cart, { product });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new Cart();
      cartItem.product = product;
      cartItem.quantity = quantity;
      em.persist(cartItem);
    }

    await em.flush();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Failed to add to cart:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
