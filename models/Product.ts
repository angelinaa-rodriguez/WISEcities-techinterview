import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

  @Entity({ tableName: 'product' })
export class Product {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string' })
  description!: string;

  @Property({ type: 'number' })
  price!: number;

  @Property({ type: 'string' })
  imageUrl!: string;
}
