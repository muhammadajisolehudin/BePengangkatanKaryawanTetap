import { subkriteriaRepository } from '../repositories/subkriteriaRepository';
import { Subkriteria } from '../models/subkriteria';
import * as kriteriaService from './kriteriaService';
import { EvaluasiFaktor } from '../models/evaluasiFaktor';
import { evaluasiFaktorRepository } from '../repositories/evaluasiFaktorRepository';

// Fungsi untuk membuat Subkriteria baru
const create = async (body: Subkriteria) => {
    try {
        // Validasi keberadaan id_kriteria
        const kriteria = await kriteriaService.getById(body.kriteria);
        // console.log("kriteria data atuh aya :", kriteria.kriteria?.bobot_kriteria)
        if (!kriteria) {
            return { status: 400, message: 'ID Kriteria does not exist' };
        }

        // Validasi bahwa kriteria memiliki bobot_kriteria
        if (typeof kriteria.kriteria?.bobot_kriteria !== 'number') {
            return { status: 500, message: 'Kriteria does not have valid bobot_kriteria' };
        }

        // Hanya kirimkan data yang diperlukan untuk membuat subkriteria
        const newSubkriteria = {
            ...body,
        };

        const createdSubkriteria = await subkriteriaRepository.create(newSubkriteria);

        // Mengambil bobot dari kriteria dan subkriteria
        const bobotKriteria = kriteria.kriteria?.bobot_presentase; 
        const bobotSubkriteria = createdSubkriteria.bobot_subkriteria;

        // Menghitung evaluasi_faktor
        const evaluasiFaktor = bobotSubkriteria / bobotKriteria;

        // Membuat EvaluasiFaktor baru
        const newEvaluasiFaktor: EvaluasiFaktor = {
            bobot_kriteria: body.kriteria,
            bobot_subkriteria: createdSubkriteria.id,
            hasil_evaluasi_faktor: evaluasiFaktor,
        };

        const createdEvaluasiFaktor = await evaluasiFaktorRepository.create(newEvaluasiFaktor);

        return {
            status: 200,
            message: 'Subkriteria and EvaluasiFaktor created successfully',
            subkriteria: createdSubkriteria,
            evaluasiFaktor: createdEvaluasiFaktor
        };

    } catch (error: any) {
        return { status: 400, message: `Validation error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan daftar Subkriteria
const list = async (): Promise<{ status: number; data?: { data: Subkriteria[]; count: number }; message?: string }> => {
    try {
        const data = await subkriteriaRepository.list();
        return { status: 200, data: { data, count: data.length } };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan Subkriteria berdasarkan ID

const getById = async (id: number): Promise<{ status: number; message: string; subkriteria?: Subkriteria }> => {
    try {
        const subkriteria = await subkriteriaRepository.getById(id);
        if (!subkriteria) {
            return { status: 404, message: `Subkriteria with id ${id} not found` };
        }
        return { status: 200, message: 'Subkriteria found', subkriteria };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk memperbarui Subkriteria
const update = async (id: number, body: Subkriteria): Promise<{ status: number; message: string }> => {
    try {
        const existingSubkriteria = await subkriteriaRepository.getById(id);
        if (!existingSubkriteria) {
            return { status: 404, message: `Subkriteria with id ${id} not found` };
        }

        const updatedSubkriteria = {
            ...body,
            updated_at: new Date() // Set timestamp saat update
        };

        await subkriteriaRepository.update(id, updatedSubkriteria);
        return { status: 200, message: 'Subkriteria updated successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk menghapus Subkriteria
const remove = async (id: number): Promise<{ status: number; message: string }> => {
    try {
        const existingSubkriteria = await subkriteriaRepository.getById(id);
        if (!existingSubkriteria) {
            return { status: 404, message: 'Subkriteria not found' };
        }

        await subkriteriaRepository.remove(id);
        return { status: 200, message: 'Subkriteria removed successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

export { create, list, getById, update, remove };
