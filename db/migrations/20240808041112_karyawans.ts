import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('karyawans', (table: Knex.TableBuilder)=>{
        table.increments('id').primary();
        table.string('nip', 20).notNullable().unique(); 
        table.string('nama', 255).notNullable();
        table.boolean('jenis_kelamin').notNullable();
        table.enu('status', ['karyawan', 'personalia', 'manager'], { useNative: true, enumName: 'status' }).notNullable();
        table.enu('posisi', ['personalia', 'manager pemasaran', 'manager keuangan', 'manager operasional', 'staff pemasaran', 'staff keuangan', 'staff logistik', 'staff maintenance'], { useNative: true, enumName: 'posisi' }).notNullable();
        table.integer('akun_id').unsigned().notNullable();
        table.foreign('akun_id').references('akuns.id');

        table.timestamps(true, true); 
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('karyawans')
}

