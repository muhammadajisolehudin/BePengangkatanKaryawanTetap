import { perangkinganRepository } from '../repositories/perangkinganRepository';
import { Perangkingan } from '../models/perangkingans';


export const updateManagerStatus = async (id: number, validasi_manager: boolean): Promise<{ status: number; message: string; perhitungan?: Perangkingan }> => {
    try {
        // Cek apakah Perangkingan dengan ID yang diberikan ada
        const perangkingan = await perangkinganRepository.getById(id);
        if (!perangkingan) {
            return { status: 404, message: `Perangkingan with id ${id} not found` };
        }

        // Update status manager
        const updatedPerangkingan = await perangkinganRepository.updateValidasiManager(id, validasi_manager);

        return { status: 200, message: 'Perangkingan updated successfully', perhitungan: updatedPerangkingan };
    } catch (error: any) {
        return { status: 500, message: `Error updating Perangkingan: ${error.message}` };
    }
};

export const getManagerStatus = async (id: number): Promise<Perangkingan | undefined> => {
    try {
        return await perangkinganRepository.getById(id);
    } catch (error: any) {
        throw new Error(`Error fetching Perangkingan: ${error.message}`);
    }
};