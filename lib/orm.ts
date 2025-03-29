import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';

export async function initORM() {
  const orm = await MikroORM.init<SqliteDriver>({
    driver: SqliteDriver,
    dbName: 'wise-cities.db',
    entities: [Product, Cart],
    metadataProvider: ReflectMetadataProvider,
    debug: true,
  });

  return orm;
}
