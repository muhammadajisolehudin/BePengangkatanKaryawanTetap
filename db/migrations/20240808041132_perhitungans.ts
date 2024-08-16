import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('perhitungans', (table: Knex.TableBuilder)=>{
        table.increments('id').primary();

        table.integer('karyawan').unsigned().notNullable();
        table.foreign('karyawan').references('karyawans.id');

        table.integer('hasil_evaluasi_faktor').unsigned().notNullable();
        table.foreign('hasil_evaluasi_faktor').references('evaluasi_faktors.id');

        table.integer('validasi_manager').unsigned().notNullable();
        table.foreign('validasi_manager').references('validasi_managers.id');

        table.integer('nama_kriteria').unsigned().notNullable();
        table.foreign('nama_kriteria').references('kriterias.id');

        table.boolean('diangkat').notNullable();

        table.timestamps(true, true); 
    })
     
    
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('perhitungans')
}

