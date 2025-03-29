import { Migration } from '@mikro-orm/migrations';

export class Migration20250329191640 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`product\` (\`id\` integer not null primary key autoincrement, \`name\` text not null, \`description\` text not null, \`price\` integer not null, \`image_url\` text not null);`);

    this.addSql(`create table \`cart\` (\`id\` integer not null primary key autoincrement, \`product_id\` integer not null, \`quantity\` integer not null, constraint \`cart_product_id_foreign\` foreign key(\`product_id\`) references \`product\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`cart_product_id_index\` on \`cart\` (\`product_id\`);`);
  }

}
