import { Knex } from 'knex';
import knexInstance from '../../config/knex';
import { Subkriteria, SubkriteriaModel } from '../models/subkriteria';

export default class SubkriteriaRepository {
   private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }
    //add data subkriteria
    public async create(subkriteria: Subkriteria): Promise<Subkriteria> {
        if (!subkriteria.kriteria) {
            throw new Error('Kriteria ID is required');
        }
        return await SubkriteriaModel.query(this.knexInstance).insert(subkriteria);
    }
    //get data subkriteria
    public async list(): Promise<Subkriteria[]> {
        return await SubkriteriaModel.query(this.knexInstance);
    }
    //get data subkriteria by id
    public async getById(id: number): Promise<Subkriteria | undefined> {
        return await SubkriteriaModel.query(this.knexInstance).findById(id);
    }
    //update subkriteria by id
    public async update(id: number, data: Subkriteria): Promise<Subkriteria> {
        return await SubkriteriaModel.query(this.knexInstance).patchAndFetchById(id, data);
    }
    //delete subkriteria by id
    public async remove(id: number): Promise<void> {
        await SubkriteriaModel.query(this.knexInstance).deleteById(id);
    }
}

export const subkriteriaRepository = new SubkriteriaRepository(knexInstance);
