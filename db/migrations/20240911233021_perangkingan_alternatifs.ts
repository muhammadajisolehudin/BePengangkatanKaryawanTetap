import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('perangkingans', (table: Knex.TableBuilder) => {
        table.increments('id').primary();

        table.integer('karyawan').unsigned().notNullable();
        table.foreign('karyawan').references('id').inTable('karyawans').onDelete('CASCADE').onUpdate('CASCADE');

        table.decimal('nilai_perangkingan', 10, 2).defaultTo(0);
        table.boolean('keputusan_diangkat').defaultTo(false).notNullable(); 
        table.boolean('validasi_manager').defaultTo(null); 
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('perangkingans'); 
}
