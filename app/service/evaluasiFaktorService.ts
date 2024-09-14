import { EvaluasiFaktor } from '../models/evaluasiFaktor';
import { Kriteria } from '../models/kriteria';
import { Subkriteria } from '../models/subkriteria';
import { evaluasiFaktorRepository } from '../repositories/evaluasiFaktorRepository';
import { kriteriaRepository } from '../repositories/kriteriaRepository';
import { subkriteriaRepository } from '../repositories/subkriteriaRepository';

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

// Fungsi untuk mendapatkan Kriteria berdasarkan ID
const getKriteria = async (id: number): Promise<{ message?: string; kriteria?: Kriteria }> => {
    try {
        const kriteria = await kriteriaRepository.getById(id);
        if (!kriteria) {
            return { message: `Kriteria with id ${id} not found` };
        }
        return { kriteria };

    } catch (error: any) {
        return { message: `Internal server error: ${error.message}` };
    }
};

const getSubkriteria = async (id: number): Promise<{ message?: string; subkriteria?: Subkriteria }> => {
    try {
        const subkriteria = await subkriteriaRepository.getById(id);
        if (!subkriteria) {
            return { message: `Subkriteria with id ${id} not found` };
        }
        return { subkriteria };

    } catch (error: any) {
        return { message: `Internal server error: ${error.message}` };
    }
};



export { list, getById, getKriteria, getSubkriteria };
