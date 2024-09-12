import { Knex } from 'knex';
import knexInstance from '../../config/knex';
import { EvaluasiFaktorModel, EvaluasiFaktor } from '../models/evaluasiFaktor';

export default class EvaluasiFaktorRepository {
    private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    //add data evaluasi faktor 
    public async create(evaluasi_faktor: EvaluasiFaktor): Promise<EvaluasiFaktor> {
        return await EvaluasiFaktorModel.query(this.knexInstance).insert(evaluasi_faktor);
    }
    //get data evaluasi faktor
    public async list(): Promise<EvaluasiFaktor[]> {
        return await EvaluasiFaktorModel.query(this.knexInstance);
    }
    //get evaluasi faktor by id
    public async getById(id: number): Promise<EvaluasiFaktor | undefined> {
        return await EvaluasiFaktorModel.query(this.knexInstance).findById(id);
    }
    //update evaluasi faktor by id
    public async update(id: number, data: EvaluasiFaktor): Promise<EvaluasiFaktor> {
        return await EvaluasiFaktorModel.query(this.knexInstance).patchAndFetchById(id, data);
    }
    //hapus evaluasi faktor by id
    public async remove(id: number): Promise<void> {
        await EvaluasiFaktorModel.query(this.knexInstance).deleteById(id);
    }
}

export const evaluasiFaktorRepository = new EvaluasiFaktorRepository(knexInstance);
