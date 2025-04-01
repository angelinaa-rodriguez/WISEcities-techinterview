const { defineConfig } = require('@mikro-orm/sqlite');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const basePath = path.resolve(__dirname, isProd ? 'dist/models' : 'models');
const toUnixPath = (p) => p.replace(/\\/g, '/');

const productPath = toUnixPath(path.join(basePath, 'Product'));
const cartPath = toUnixPath(path.join(basePath, 'Cart'));

const Product = require(productPath).Product;
const Cart = require(cartPath).Cart;

console.log('🧠 MikroORM config loaded');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Base path:', basePath);
console.log('Product path:', productPath);
console.log('Product class:', Product?.name);
console.log('Cart class:', Cart?.name);

module.exports = defineConfig({
  dbName: 'wise-cities.db',
  entities: [Product, Cart],
  migrations: {
    path: './migrations',
  },
  debug: true,
});
