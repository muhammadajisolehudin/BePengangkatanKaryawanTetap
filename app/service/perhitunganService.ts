import { evaluasiFaktorRepository } from '../repositories/evaluasiFaktorRepository';
import { kriteriaRepository } from '../repositories/kriteriaRepository';
import { perhitunganRepository } from '../repositories/perhitunganRepository'; // Pastikan jalur ini sesuai dengan struktur proyek Anda
import { subkriteriaRepository } from '../repositories/subkriteriaRepository';
import { updatePerankingan } from './perangkinganService';

interface Perhitungan {
    id: number; // 'id' sesuai dengan auto-increment
    karyawan: number;
    hasil_evaluasi_faktor: number;
    kriteria: number;
    subkriteria: number;
    hasil_perhitungan: number; 
    created_at: Date;
    updated_at: Date;
}

// Fungsi untuk membuat Perhitungan baru
const create = async (body: Perhitungan): Promise<{ status: number; message: string; perhitungan?: Perhitungan }> => {
    try {

        const evaluasi_faktor = await evaluasiFaktorRepository.getById(body.hasil_evaluasi_faktor);
        if (!evaluasi_faktor) {
            return { status: 404, message: `Evaluasi Faktor with id ${body.hasil_evaluasi_faktor} not found` };
        }

        // Ambil data kriteria dan subkriteria
        const kriteria = await kriteriaRepository.getById(body.kriteria);
        if (!kriteria) {
            return { status: 404, message: `Kriteria with id ${body.kriteria} not found` };
        }

        const subkriteria = await subkriteriaRepository.getById(body.subkriteria); // Ambil data subkriteria
        if (!subkriteria) {
            return { status: 404, message: `Subkriteria with id ${body.subkriteria} not found` };
        }
        // Hitung hasil_perhitungan
        const hasil_perhitungan = kriteria.bobot_kriteria * evaluasi_faktor.hasil_evaluasi_faktor; // Sesuaikan dengan kebutuhan perhitungan

        // Tambahkan nilai hasil_perhitungan ke body
        const newPerhitungan = {
            ...body,
            hasil_perhitungan
        };

        // Simpan data perhitungan ke database
        const createdPerhitungan = await perhitunganRepository.create(newPerhitungan);
        // Update atau buat ranking setelah perhitungan dibuat
        await updatePerankingan(body.karyawan);
        return { status: 200, message: 'Perhitungan created successfully', perhitungan: createdPerhitungan };

    } catch (error: any) {
        return { status: 400, message: `Validation error: ${error.message}` };
        
    }
};


// Fungsi untuk mendapatkan daftar Perhitungan
const list = async (): Promise<{ status: number; data?: { data: Perhitungan[]; count: number }; message?: string }> => {
    try {
        const data = await perhitunganRepository.list();
        return { status: 200, data: { data, count: data.length } };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan Perhitungan berdasarkan ID
const getById = async (id: number): Promise<{ status: number; message: string; perhitungan?: Perhitungan }> => {
    try {
        const perhitungan = await perhitunganRepository.getById(id);
        if (!perhitungan) {
            return { status: 404, message: `Perhitungan with id ${id} not found` };
        }
        return { status: 200, message: 'The perhitungan was found', perhitungan };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk memperbarui Perhitungan
const update = async (id: number, body: Partial<Perhitungan>): Promise<{ status: number; message: string }> => {
    try {
        const perhitungan = await perhitunganRepository.getById(id);
        if (!perhitungan) {
            return { status: 404, message: `Perhitungan with id ${id} not found` };
        }

        await perhitunganRepository.update(id, body);
        return { status: 200, message: 'Perhitungan updated successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk menghapus Perhitungan
const remove = async (id: number): Promise<{ status: number; message: string }> => {
    try {
        const perhitungan = await perhitunganRepository.getById(id);
        if (!perhitungan) {
            return { status: 404, message: 'Perhitungan not found' };
        }

        await perhitunganRepository.remove(id);
        return { status: 200, message: 'Perhitungan removed successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

export { create, list, getById, update, remove };
