import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';

const config = (await import('./mikro-orm.config.cjs')).default;

const run = async () => {
  const orm = await MikroORM.init(config);
  const generator = orm.getMigrator();

  await generator.createMigration();
  await generator.up();              

  console.log('Migration created and applied!');
  await orm.close();
};

run().catch((err) => {
  console.error('Migration failed:', err);
});
