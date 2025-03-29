const { defineConfig } = require('@mikro-orm/sqlite');
const { Product } = require('./models/Product');
const { Cart } = require('./models/Cart');

module.exports = defineConfig({
  dbName: 'wise-cities.db',
  entities: [Product, Cart],
  migrations: {
    path: './migrations',
  },
  debug: true,
});
