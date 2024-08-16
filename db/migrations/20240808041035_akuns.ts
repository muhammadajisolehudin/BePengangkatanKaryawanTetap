import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('akuns', (table: Knex.TableBuilder)=>{
        table.increments('id').primary();
        table.string('username', 255).notNullable();
        table.string('password', 255).notNullable();
        table.enu('role', ['karyawan', 'personalia', 'manager'], { useNative: true, enumName: 'role' }).notNullable();

        table.timestamps(true, true); 
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('akuns');
}

