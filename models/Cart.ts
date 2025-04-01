import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Product } from './Product';

@Entity({ tableName: 'Cart' })
export class Cart {
  @PrimaryKey({ type: 'number' })
  id!: number;

  @ManyToOne({ entity: () => Product })
  product!: Product;

  @Property({ type: 'number' })
  quantity!: number;
}
