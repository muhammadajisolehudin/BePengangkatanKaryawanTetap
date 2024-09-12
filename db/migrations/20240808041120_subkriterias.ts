import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('subkriterias', (table: Knex.TableBuilder) => {
        table.increments('id').primary();

        table.integer('kriteria').unsigned().notNullable();
        table.foreign('kriteria')
            .references('id')
            .inTable('kriterias')
            .onDelete('CASCADE')  
            .onUpdate('CASCADE');  

        table.string('nama_subkriteria', 30).notNullable();
        table.float('bobot_subkriteria').notNullable();

        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('subkriterias');
}
