import { perangkinganRepository } from '../repositories/perangkinganRepository';
import { Perangkingan } from '../models/perangkingans';


export const updateValidasiManager = async (id: number, validasi_manager: boolean, keterangan:string): Promise<{ status: number; message: string; perhitungan?: Perangkingan }> => {
    try {
        // Cek apakah Perangkingan dengan ID yang diberikan ada
        const perangkingan = await perangkinganRepository.getById(id);
        if (!perangkingan) {
            return { status: 404, message: `Perangkingan with id ${id} not found` };
        }

        // Update status manager
        const updatedPerangkingan = await perangkinganRepository.updateValidasiManager(id, validasi_manager, keterangan);

        return { status: 200, message: 'Perangkingan updated successfully', perhitungan: updatedPerangkingan };
    } catch (error: any) {
        return { status: 500, message: `Error updating Perangkingan: ${error.message}` };
    }
};

export const getValidasiManagerById = async (id: number): Promise<Perangkingan | undefined> => {
    try {
        return await perangkinganRepository.getById(id);
    } catch (error: any) {
        throw new Error(`Error fetching Perangkingan: ${error.message}`);
    }
};

// Fungsi untuk mendapatkan daftar Perangkingan
export const getValidasiManager = async (): Promise<{ status: number; data?: { data: Perangkingan[]; count: number }; message?: string }> => {
    try {
        
        const data = await perangkinganRepository.list();
        return { status: 200, data: { data, count: data.length } };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};
