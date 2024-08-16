import { Knex } from "knex";
import { AkunModel, Akun } from "../models/akun";
import knexInstance from '../../config/knex';

export default class AuthRepository {
    private readonly knexInstance: Knex;

    constructor(knexInstance: Knex) {
        this.knexInstance = knexInstance;
    }

    public async findByUsername(username: string): Promise<Akun | undefined> {
        try {
            return await AkunModel.query(this.knexInstance)
                .where('username', username)
                .first();
        } catch (error) {
            console.error("Error finding Akun by username:", error);
            throw error;
        }
    }
    
    public async register(Akun: Partial<Akun>): Promise<Akun> {
        try {
            return await AkunModel.query(this.knexInstance).insertAndFetch(Akun);
        } catch (error) {
            console.error("Error registering new Akun:", error);
            throw error;
        }
    }
}


export const authRepository = new AuthRepository(knexInstance);