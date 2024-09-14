import { Knex } from 'knex';
import knexInstance from '../../config/knex'; // Pastikan jalur ini sesuai dengan struktur proyek Anda
import { PerhitunganModel, Perhitungan } from '../models/perhitungan'; // Pastikan jalur ini sesuai dengan struktur proyek Anda

export default class PerhitunganRepository {
    private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    // Add data perhitungan
    public async create(perhitungan: Perhitungan): Promise<Perhitungan> {
        return await PerhitunganModel.query(this.knexInstance).insert(perhitungan);
    }

    // Get all data perhitungan
    public async list(): Promise<Perhitungan[]> {
        return await PerhitunganModel.query(this.knexInstance);
    }

    // Get perhitungan by id
    public async getById(id: number): Promise<Perhitungan | undefined> {
        return await PerhitunganModel.query(this.knexInstance).findById(id);
    }

    public async getByKaryawanId(karyawanId: number): Promise<Perhitungan[]> {
        return await PerhitunganModel.query(this.knexInstance).where('karyawan', karyawanId);
    }


    // Update perhitungan by id
    public async update(id: number, data: Partial<Perhitungan>): Promise<Perhitungan> {
        return await PerhitunganModel.query(this.knexInstance).patchAndFetchById(id, data);
    }

    // Delete perhitungan by id
    public async remove(id: number): Promise<void> {
        await PerhitunganModel.query(this.knexInstance).deleteById(id);
    }

    // Check for duplicate perhitungan with same karyawan and kriteria
    public async checkDuplicate(karyawan: number, kriteria: number): Promise<Perhitungan | undefined> {
        return await PerhitunganModel.query(this.knexInstance)
            .where('karyawan', karyawan)
            .andWhere('kriteria', kriteria)
            .first();
    }
}

// Export instance of PerhitunganRepository with knexInstance
export const perhitunganRepository = new PerhitunganRepository(knexInstance);
