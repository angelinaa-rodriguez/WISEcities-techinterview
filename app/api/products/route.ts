import { NextResponse } from 'next/server';
import { MikroORM } from '@mikro-orm/core';
import { Product } from '../../../models/Product';
import 'reflect-metadata';

export async function GET() {
  try {
    // ✅ Dynamic import must happen inside the function
    const config = (await import('../../../mikro-orm.config.cjs')).default;

    const orm = await MikroORM.init(config);
    const em = orm.em.fork();

    const products = await em.find(Product, {});
    await orm.close();

    return NextResponse.json(products);
  } catch (err) {
    console.error('❌ Failed to fetch products:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
