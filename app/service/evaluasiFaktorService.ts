import { EvaluasiFaktor } from '../models/evaluasiFaktor';
import { evaluasiFaktorRepository } from '../repositories/evaluasiFaktorRepository';

// Fungsi untuk mendapatkan daftar EvaluasiFaktor
const list = async (): Promise<{ status: number; data?: { data: EvaluasiFaktor[]; count: number }; message?: string }> => {
    try {
        const data = await evaluasiFaktorRepository.list();
        return { status: 200, data: { data, count: data.length } };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan EvaluasiFaktor berdasarkan ID
const getById = async (id: number): Promise<{ status: number; message: string; evaluasi_faktor?: EvaluasiFaktor }> => {
    try {
        const evaluasiFaktor = await evaluasiFaktorRepository.getById(id);
        if (!evaluasiFaktor) {
            return { status: 404, message: `EvaluasiFaktor with id ${id} not found` };
        }
        return { status: 200, message: 'EvaluasiFaktor found', evaluasi_faktor: evaluasiFaktor };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};


export { list, getById };
