// import { akunRepository } from '../repositories/akunRepository';
// import { Akun } from '../models/akun';
import { akunRepository } from '../repositories/akunRepository';
import { Akun } from '../models/akun';

// Fungsi untuk membuat akun baru
const create = async (username: string, password: string) => {
    try {
        const createdAkun = await akunRepository.create(username, password);

        // Mengembalikan id dari akun yang baru dibuat
        return { id: createdAkun.id };
    } catch (error: any) {
        throw new Error(`Validation error: ${error.message}`);
    }
};


// Fungsi untuk mendapatkan daftar akun
const list = async () => {
    try {
        const data = await akunRepository.list();
        return { status: 200, data };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan akun berdasarkan ID
const getById = async (id: string) => {
    try {
        const akun = await akunRepository.getById(id);
        if (!akun) {
            return { status: 404, message: `Akun with id ${id} not found` };
        }
        return { status: 200, message: 'Akun found', akun };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

const verifyPassword = async (id: string, oldPassword: string) => {
    try {
        const akun = await akunRepository.getById(id);
        if (!akun) {
            return { status: 404, message: 'Akun not found' };
        }

        const isPasswordValid = await akunRepository.verifyPassword(oldPassword, akun.password);
        if (!isPasswordValid) {
            return { status: 400, message: 'Old password is incorrect' };
        }

        return { status: 200, message: 'Old password verified successfully' };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mengubah password
const changePassword = async (id: string, newPassword: string) => {
    try {
        // Memanggil repository untuk melakukan hashing dan update password
        return await akunRepository.changePassword(id, newPassword);
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk menghapus akun
const remove = async (id: string) => {
    try {
        await akunRepository.remove(id);
        return { status: 200, message: 'Akun removed successfully' };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};



export { create, list, getById, verifyPassword, changePassword, remove };
