import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('perangkingans', (table: Knex.TableBuilder) => {
        // Menambahkan kolom created_at dan updated_at
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('perangkingans', (table: Knex.TableBuilder) => {
        // Menghapus kolom created_at dan updated_at
        table.dropTimestamps();
    });
}
