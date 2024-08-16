import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("karyawans").del();

    await knex('karyawans').insert([
        { id: 1, nama: 'John Doe manager', jenis_kelamin: true, posisi: 'manager', akun_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 2, nama: 'okie peronalia', jenis_kelamin: false, posisi: 'personalia', akun_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 3, nama: 'Jim karyawan', jenis_kelamin: true, posisi: 'karyawan_biasa', akun_id: 3, created_at: new Date(), updated_at: new Date() }
    ]);
};
