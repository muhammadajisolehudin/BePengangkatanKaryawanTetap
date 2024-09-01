import { Knex } from 'knex';
import knexInstance from '../../config/knex';
import { Karyawan, KaryawanModel } from '../models/karyawan';

export default class KaryawanRepository {
   private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    //get data karyawan
    public async listKaryawan(): Promise<Karyawan[]> {
        return await KaryawanModel.query(this.knexInstance);
    }

    //get karyawan by id
    public async getById(id: string): Promise<Karyawan | undefined> {
        return await KaryawanModel.query(this.knexInstance).findById(id);
    }

    //update data karyawan
    public async update(id: string, data: Karyawan): Promise<Karyawan> {
        return await KaryawanModel.query(this.knexInstance).patchAndFetchById(id, data);
    }

    // hapus data karyawan
    public async remove(id: string): Promise<void> {
        await KaryawanModel.query(this.knexInstance).deleteById(id);
    }
}

export const karyawanRepository = new KaryawanRepository(knexInstance);
