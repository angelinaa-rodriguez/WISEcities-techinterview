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
    {
      name: 'Bluetooth Speaker',
      description: 'Portable speaker with deep bass and long battery life',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Speaker',
    },
    {
      name: 'Laptop Stand',
      description: 'Adjustable stand for better posture and airflow',
      price: 24.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Laptop+Stand',
    },
    {
      name: 'Wireless Mouse',
      description: 'Ergonomic mouse with silent clicks',
      price: 19.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Mouse',
    },
    {
      name: 'Reusable Water Bottle',
      description: 'Stainless steel bottle to keep drinks hot or cold',
      price: 17.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Water+Bottle',
    },
    {
      name: 'Desk Lamp',
      description: 'LED desk lamp with brightness control and USB port',
      price: 34.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Lamp',
    },
    {
      name: 'Noise-Isolating Earbuds',
      description: 'Compact earbuds with mic and tangle-free cable',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/300x300?text=Earbuds',
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