import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('kriterias', (table: Knex.TableBuilder)=>{
         table.increments('id').primary();

        table.string('nama_kriteria', 30).notNullable();
        table.integer('bobot_presentase').notNullable();
        table.float('bobot_kriteria').notNullable();

        table.timestamps(true, true); 
    })
    
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('kriterias')
}

