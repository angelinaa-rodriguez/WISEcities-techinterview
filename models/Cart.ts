import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Product } from './Product';

@Entity()
export class Cart {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  product!: Product;

  @Property()
  quantity!: number;
}
