import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';

const config = (await import('./mikro-orm.config.cjs')).default;

const seed = async () => {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  const Product = orm.getMetadata().get('Product').class;

  const products = [
    {
      name: 'Headphones',
      description: 'Noise cancelling headphones',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Headphones',
    },
    {
      name: 'Smart Watch',
      description: 'Fitness and notifications on your wrist',
      price: 129.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Watch',
    },
  ];

  for (const p of products) {
    const product = new Product(); // ← ✅ now using correct version
    product.name = p.name;
    product.description = p.description;
    product.price = p.price;
    product.imageUrl = p.imageUrl;
    em.persist(product);
  }

  await em.flush();
  await orm.close();
  console.log('✅ Seeding complete!');
};

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
});
