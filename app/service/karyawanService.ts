import { karyawanRepository } from '../repositories/karyawanRepository';
import * as akunService from './akunService';

interface Karyawan {
    id: number; 
    nip: string;
    nama: string;
    jenis_kelamin: boolean;
    posisi: string;
    akun_id: number;
    created_at: Date;
    updated_at: Date;
}

// Fungsi untuk membuat Karyawan baru
const create = async (body: Karyawan) => {
    try {
        // Membuat akun untuk karyawan
        const username = body.nip; // Menggunakan NIP sebagai username
        const defaultPassword = body.nip; // Gunakan NIP sebagai password default, sebaiknya di-hash

        const createdAkun = await akunService.create(username, defaultPassword);

        // Update karyawan body dengan akun_id dari akun yang baru dibuat
        const newKaryawan = {
            ...body,
            akun_id: createdAkun.id,
        };

        // Menyimpan data karyawan
        const createdKaryawan = await karyawanRepository.create(newKaryawan);
        return { status: 200, message: 'Karyawan created successfully', karyawan: createdKaryawan };

    } catch (error: any) {
        return { status: 400, message: `Validation error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan daftar Karyawan
const list = async (): Promise<{ status: number; data?: { data: Karyawan[]; count: number }; message?: string }> => {
    try {
        const data = await karyawanRepository.list();
        return { status: 200, data: { data, count: data.length } };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan Karyawan berdasarkan ID
const getById = async (id: number): Promise<{ status: number; message: string; karyawan?: Karyawan }> => {
    try {
        const karyawan = await karyawanRepository.getById(id);
        if (!karyawan) {
            return { status: 404, message: `Karyawan with id ${id} not found` };
        }
        return { status: 200, message: 'The karyawan was found', karyawan };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};


// Fungsi untuk memperbarui Karyawan
const update = async (id: number, body: Karyawan): Promise<{ status: number; message: string }> => {
    try {
        const karyawan = await karyawanRepository.getById(id);
        if (!karyawan) {
            return { status: 404, message: `Karyawan with id ${id} not found` };
        }
        const updatedKaryawan: Karyawan = {
            ...body,
        };

        await karyawanRepository.update(id, { ...updatedKaryawan });
        return { status: 200, message: 'Karyawan updated successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk menghapus Karyawan
const remove = async (id: number): Promise<{ status: number; message: string }> => {
    try {
        const karyawan = await karyawanRepository.getById(id);
        if (!karyawan) {
            return { status: 404, message: 'Karyawan not found' };
        }

        await karyawanRepository.remove(id);
        return { status: 200, message: 'Karyawan removed successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

export { create, list, getById, update, remove };
