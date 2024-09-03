import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("karyawans").del();

    await knex('karyawans').insert([
        { id: 1, nama: 'John Doe manager',nip: 1223456, jenis_kelamin: true, posisi: 'manager', akun_id: 1, created_at: new Date(), updated_at: new Date() },
        { id: 2, nama: 'okie peronalia',nip:112233, jenis_kelamin: false, posisi: 'personalia', akun_id: 2, created_at: new Date(), updated_at: new Date() },
        { id: 3, nama: 'Jim karyawan',nip:121212, jenis_kelamin: true, posisi: 'karyawan_biasa', akun_id: 3, created_at: new Date(), updated_at: new Date() }
    ]);
};
