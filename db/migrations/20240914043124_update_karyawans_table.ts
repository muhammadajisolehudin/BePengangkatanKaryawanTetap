import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Drop the existing foreign key constraint
    await knex.schema.table('karyawans', (table) => {
        table.dropForeign('akun_id');
    });

    // Re-add the foreign key with CASCADE options
    await knex.schema.table('karyawans', (table) => {
        table.foreign('akun_id')
            .references('akuns.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
}

export async function down(knex: Knex): Promise<void> {
    // Drop the foreign key constraint
    await knex.schema.table('karyawans', (table) => {
        table.dropForeign('akun_id');
    });

    // Revert to the original state without CASCADE options
    await knex.schema.table('karyawans', (table) => {
        table.foreign('akun_id').references('akuns.id');
    });
}
