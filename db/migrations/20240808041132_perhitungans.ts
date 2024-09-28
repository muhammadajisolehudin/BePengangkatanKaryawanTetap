import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('perhitungans', (table: Knex.TableBuilder) => {
        table.increments('id').primary();

        table.integer('karyawan').unsigned().notNullable();
        table.foreign('karyawan')
            .references('id')
            .inTable('karyawans')
            .onDelete('CASCADE')  
            .onUpdate('CASCADE'); 

        table.integer('hasil_evaluasi_faktor').unsigned().notNullable();
        table.foreign('hasil_evaluasi_faktor')
            .references('id')
            .inTable('evaluasi_faktors')
            .onDelete('CASCADE')  
            .onUpdate('CASCADE'); 

        table.integer('kriteria').unsigned().notNullable();
        table.foreign('kriteria')
            .references('id')
            .inTable('kriterias')
            .onDelete('CASCADE')  
            .onUpdate('CASCADE'); 

        // table.integer('subkriteria').unsigned().notNullable();
        // table.foreign('subkriteria')
        //     .references('id')
        //     .inTable('subkriterias')
        //     .onDelete('CASCADE')  
        //     .onUpdate('CASCADE'); 

        table.decimal('hasil_perhitungan', 10, 2).notNullable();

        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('perhitungans');
}
