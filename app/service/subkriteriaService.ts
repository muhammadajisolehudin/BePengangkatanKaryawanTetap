import { subkriteriaRepository } from '../repositories/subkriteriaRepository';
import { Subkriteria } from '../models/subkriteria';
import * as kriteriaService from './kriteriaService';

// Fungsi untuk membuat Subkriteria baru
const create = async (body: Subkriteria) => {
    try {
        // Validasi keberadaan id_kriteria
        const kriteria = await kriteriaService.getById(body.kriteria);
        if (!kriteria) {
            return { status: 400, message: 'ID Kriteria does not exist' };
        }
        // Hanya kirimkan data yang diperlukan untuk membuat subkriteria
        const newSubkriteria = {
            ...body,
        };

        const createdSubkriteria = await subkriteriaRepository.create(newSubkriteria);
        return { status: 200, message: 'Subkriteria created successfully', subkriteria: createdSubkriteria };

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
