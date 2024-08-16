// import { Knex } from "knex";
// import { AdminModel, Admin } from "../models/karyawan";
// import knexInstance from '../../config/knex';

// export default class AdminRegistrationRepository {
//     private readonly knexInstance: Knex;

//     constructor(knexInstance: Knex) {
//         this.knexInstance = knexInstance;
//     }

//     public async findByUsername(username: string): Promise<Admin | undefined> {
//         try {
//             return await AdminModel.query(this.knexInstance)
//                 .where('username', username)
//                 .first();
//         } catch (error) {
//             console.error("Error finding user by username:", error);
//             throw error;
//         }
//     }
    
//     public async register(user: Partial<Admin>): Promise<Admin> {
//         try {
//             return await AdminModel.query(this.knexInstance).insertAndFetch(user);
//         } catch (error) {
//             console.error("Error registering new user:", error);
//             throw error;
//         }
//     }
// }


// export const adminRegistrationRepository = new AdminRegistrationRepository(knexInstance);