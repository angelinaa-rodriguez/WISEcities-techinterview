import { Options } from '@mikro-orm/core';
import { Product } from './models/Product.ts';
import { Cart } from './models/Cart.ts';

const config: Options = {
  type: 'sqlite',
  dbName: 'wise-cities.db',
  entities: [Product, Cart],
  debug: true,
};

export default config;
