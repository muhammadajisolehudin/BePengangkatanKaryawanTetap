import { Knex } from "knex";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("akuns").del();

    // Inserts seed entries
   // Generate hashed password using bcrypt
    const hashedPassword = await bcrypt.hash('password', 10);

    // Insert data pengguna ke dalam tabel 'users'
    await knex('akuns').insert([
        {
            id: 1, 
            username: 'manager',
            password: hashedPassword, 
            role: 'manager',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 2,            
            username: 'personalia',
            password: hashedPassword, 
            role: 'personalia',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 3,             
            username: 'karyawan',
            password: hashedPassword, 
            role: 'karyawan',
            created_at: new Date(),
            updated_at: new Date()
        }
        // Anda dapat menambahkan data pengguna lainnya sesuai kebutuhan
    ]);
};
