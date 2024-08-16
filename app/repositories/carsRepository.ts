// import { Knex } from 'knex';
// import { CarsModel, Car } from '../models/cars_';
// import knexInstance from '../../config/knex';

// export default class CarsRepository {
//    private readonly knexInstance: Knex;

//     constructor(knexInstance: Knex) {
//         this.knexInstance = knexInstance;
//     }

//     public async create(car: Car): Promise<Car> {
//         return await CarsModel.query(this.knexInstance).insert(car);
//     }

//     public async list(): Promise<Car[]> {
//         return await CarsModel.query(this.knexInstance);
//     }

//     public async getById(id: string): Promise<Car | undefined> {
//         return await CarsModel.query(this.knexInstance).findById(id);
//     }

//     public async update(id: string, data: Car): Promise<Car> {
//         return await CarsModel.query(this.knexInstance).patchAndFetchById(id, data);
//     }

//     public async remove(id: string): Promise<void> {
//         await CarsModel.query(this.knexInstance).deleteById(id);
//     }
// }

// export const carsRepository = new CarsRepository(knexInstance);
