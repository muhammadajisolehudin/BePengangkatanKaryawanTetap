import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('validasi_managers', (table: Knex.TableBuilder)=>{
        table.increments('id').primary()
        table.boolean('disetujui').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('validasi_managers')
}

