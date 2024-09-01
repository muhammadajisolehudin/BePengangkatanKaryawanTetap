import { Knex } from 'knex';
import knexInstance from '../../config/knex';
import { Kriteria, KriteriaModel } from '../models/kriteria';

export default class KriteriaRepository {
   private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    //add data kriteria
    public async create(kriteria: Kriteria): Promise<Kriteria> {
        return await KriteriaModel.query(this.knexInstance).insert(kriteria);
    }
    //get data kriteria
    public async list(): Promise<Kriteria[]> {
        return await KriteriaModel.query(this.knexInstance);
    }
    //get kriteria by id
    public async getById(id: number): Promise<Kriteria | undefined> {
        return await KriteriaModel.query(this.knexInstance).findById(id);
    }
    //update kriteria by id
    public async update(id: number, data: Kriteria): Promise<Kriteria> {
        return await KriteriaModel.query(this.knexInstance).patchAndFetchById(id, data);
    }
    //hapus kriteria by id
    public async remove(id: number): Promise<void> {
        await KriteriaModel.query(this.knexInstance).deleteById(id);
    }
}

export const kriteriaRepository = new KriteriaRepository(knexInstance);
