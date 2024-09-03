import { Knex } from 'knex';
import knexInstance from '../../config/knex';
import { Akun, AkunModel } from '../models/akun';
import bcrypt from 'bcrypt';

export default class AkunRepository {
    private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    public async create(username: string, password: string) {
        const hashedPassword = await this.hashPassword(password);
        return await AkunModel.query(this.knexInstance).insert({ username, password: hashedPassword });
    }

    // Dapatkan daftar akun
    public async list(): Promise<Akun[]> {
        return await AkunModel.query(this.knexInstance);
    }

    // Dapatkan akun berdasarkan ID
    public async getById(id: string): Promise<Akun | undefined> {
        return await AkunModel.query(this.knexInstance).findById(id);
    }

    // Fungsi untuk memverifikasi password
    async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        // Asumsikan Anda menggunakan bcrypt atau alat hash lain
        const bcrypt = require('bcrypt');
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    // Fungsi untuk memperbarui password
    async updatePassword(id: string, newPassword: string): Promise<Akun> {
        return this.knexInstance('akuns')
            .where({ id })
            .update({ password: newPassword })
            .returning('*')
            .then(rows => rows[0]);
    }


    // Metode untuk mengubah password di repository
    async changePassword(id: string, newPassword: string): Promise<Akun> {
        const hashedNewPassword = await this.hashPassword(newPassword);
        return this.updatePassword(id, hashedNewPassword);
    }

    // Hapus data akun
    public async remove(id: string): Promise<void> {
        await AkunModel.query(this.knexInstance).deleteById(id);
    }

    // Method to hash the password
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    // Method to verify the password
    // private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    //     return bcrypt.compare(password, hashedPassword);
    // }
}

export const akunRepository = new AkunRepository(knexInstance);
