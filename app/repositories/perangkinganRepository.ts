import { Knex } from 'knex';
import knexInstance from '../../config/knex';
import { Perangkingan, PerangkinganModel } from '../models/perangkingans';

export default class PerangkinganRepository {
    private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    // Tambah data Perangkingan
    public async create(perangkingan: Omit<Perangkingan, 'id' | 'created_at' | 'updated_at'>): Promise<Perangkingan> {
        return await PerangkinganModel.query(this.knexInstance).insert(perangkingan).returning('*');
    }

    // Ambil semua data Perangkingan
    public async list(): Promise<Perangkingan[]> {
        return await PerangkinganModel.query(this.knexInstance);
    }

    // Ambil Perangkingan berdasarkan id
    public async getById(id: number): Promise<Perangkingan | undefined> {
        return await PerangkinganModel.query(this.knexInstance).findById(id);
    }

    // Ambil Perangkingan berdasarkan karyawan id
    public async getByKaryawanId(karyawanId: number): Promise<Perangkingan | undefined> {
        return await PerangkinganModel.query(this.knexInstance).where('karyawan', karyawanId).first();
    }


    // Update Perangkingan berdasarkan id
    public async update(id: number, data: Partial<Omit<Perangkingan, 'id' | 'created_at' | 'updated_at'>>): Promise<Perangkingan> {
        return await PerangkinganModel.query(this.knexInstance).patchAndFetchById(id, data);
    }

    // Hapus Perangkingan berdasarkan id
    public async remove(id: number): Promise<void> {
        await PerangkinganModel.query(this.knexInstance).deleteById(id);
    }

    // Update status validasi manager
    public async updateValidasiManager(id: number, validasi_manager: boolean, keterangan:string): Promise<Perangkingan> {
        return await PerangkinganModel.query(this.knexInstance)
            .patchAndFetchById(id, { validasi_manager:validasi_manager ,  keterangan:keterangan});
    }

}

export const perangkinganRepository = new PerangkinganRepository(knexInstance);
