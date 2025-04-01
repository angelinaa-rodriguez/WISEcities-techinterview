import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { Product } from './models/Product'; 
import { Cart } from './models/Cart';     

const config = (await import('./mikro-orm.config.cjs')).default;

const seed = async () => {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();


  // Delete old data first to prevent duplicates
  await em.nativeDelete(Cart, {});
  await em.nativeDelete(Product, {});
  await em.getConnection().execute('DELETE FROM sqlite_sequence WHERE name = ?', ['product']);


  const products = [
    {
      name: 'Headphones',
      description: `Noise cancelling headphones. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed elementum, felis ut tempor tempor, tellus eros scelerisque est, quis finibus arcu libero viverra augue. 
  Duis consequat, lacus at ornare faucibus, dolor metus iaculis ipsum, a pellentesque dolor augue vel magna. 
  Donec tristique vel diam eu suscipit. Praesent nec felis risus.`,
      price: 99.99,
      imageUrl: '/hero.jpg',
    },
    {
      name: 'Smart Watch',
      description: `Fitness and notifications on your wrist. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed elementum, felis ut tempor tempor, tellus eros scelerisque est, quis finibus arcu libero viverra augue. 
  Duis consequat, lacus at ornare faucibus, dolor metus iaculis ipsum, a pellentesque dolor augue vel magna. 
  Donec tristique vel diam eu suscipit. Praesent nec felis risus.`,
      price: 129.99,
      imageUrl: '/hero.jpg',
    },
    {
      name: 'Bluetooth Speaker',
      description: `Portable speaker with deep bass, Bluetooth 5.0, and up to 20 hours of battery life. 
  Perfect for both indoor and outdoor use. Water-resistant and compact enough to travel anywhere.`,
      price: 49.99,
      imageUrl: '/hero.jpg',
    },
    {
      name: 'Laptop Stand',
      description: `Adjustable aluminum stand designed to improve posture and cooling airflow. 
  Folds flat for travel and supports up to 17-inch laptops. Lightweight, durable, and modern.`,
      price: 24.99,
      imageUrl: '/hero.jpg',
    },
    {
      name: 'Wireless Mouse',
      description: `Ergonomic design with silent clicking and smooth tracking. 
  Long-lasting battery life and reliable 2.4GHz wireless connection with USB receiver.`,
      price: 19.99,
      imageUrl: '/hero.jpg',
    },
    {
      name: 'Reusable Water Bottle',
      description: `Insulated stainless steel bottle keeps drinks cold for 24 hours or hot for 12. 
  Leak-proof lid and sleek matte finish. Eco-friendly and perfect for daily use.`,
      price: 17.99,
      imageUrl: '/hero.jpg',
    },
    {
      name: 'Desk Lamp',
      description: `LED desk lamp with adjustable brightness levels, color temperature modes, and USB charging port. 
  Minimalist design with touch control and a flexible neck for optimal lighting.`,
      price: 34.99,
      imageUrl: '/hero.jpg',
    },
    {
      name: 'Noise-Isolating Earbuds',
      description: `Compact in-ear design with powerful sound and built-in microphone. 
  Comes with multiple ear tip sizes and a tangle-free cable. Great for calls, music, and commuting.`,
      price: 29.99,
      imageUrl: '/hero.jpg',
    },
  ];
  
  

  for (const p of products) {
    const product = new Product();
    product.name = p.name;
    product.description = p.description;
    product.price = p.price;
    product.imageUrl = p.imageUrl;
    em.persist(product);
  }

  await em.flush();
  await orm.close();
  console.log('Seeding complete!');
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
});