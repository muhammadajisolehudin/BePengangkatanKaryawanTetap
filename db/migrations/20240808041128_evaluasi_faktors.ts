import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('evaluasi_faktors', (table: Knex.TableBuilder)=>{
        table.increments('id').primary();
        
        table.integer('bobot_kriteria').unsigned().notNullable();
        table.foreign('bobot_kriteria').references('kriterias.id');

        table.integer('bobot_subkriteria').unsigned().notNullable();
        table.foreign('bobot_subkriteria').references('subkriterias.id');

         table.float('hasil_evaluasi_faktor').notNullable();

        table.timestamps(true, true); 
    })
}


export async function down(knex: Knex): Promise<void> {
}

