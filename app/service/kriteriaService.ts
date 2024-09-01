import { kriteriaRepository } from '../repositories/kriteriaRepository';

interface Kriteria {
    id: number; // 'id' sesuai dengan auto-increment
    nama_kriteria: string;
    bobot_presentase: number;
    bobot_kriteria: number;
    created_at: Date;
    updated_at: Date;
}

// Fungsi untuk membuat Kriteria baru
const create = async (body: Kriteria) => {
    try {
        // Hanya kirimkan data yang diperlukan untuk membuat kriteria
        const newKriteria = {
            ...body,
        };

        const createdKriteria = await kriteriaRepository.create(newKriteria);
        return { status: 200, message: 'Kriteria created successfully', kriteria: createdKriteria };

    } catch (error: any) {
        return { status: 400, message: `Validation error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan daftar Kriteria
const list = async (): Promise<{ status: number; data?: { data: Kriteria[]; count: number }; message?: string }> => {
    try {
        const data = await kriteriaRepository.list();
        return { status: 200, data: { data, count: data.length } };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan Kriteria berdasarkan ID
const getById = async (id: number): Promise<{ status: number; message: string; kriteria?: Kriteria }> => {
    try {
        const kriteria = await kriteriaRepository.getById(id);
        if (!kriteria) {
            return { status: 404, message: `Kriteria with id ${id} not found` };
        }
        return { status: 200, message: 'The kriteria was found', kriteria };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};


// Fungsi untuk memperbarui Kriteria
const update = async (id: number, body:Kriteria): Promise<{ status: number; message: string }> => {
    try {
        const kriteria = await kriteriaRepository.getById(id);
        if (!kriteria) {
            return { status: 404, message: `Kriteria with id ${id} not found` };
        }
        const updatedKriteria: Kriteria = {
            ...body,
        };

        await kriteriaRepository.update(id, { ...updatedKriteria });
        return { status: 200, message: 'Kriteria updated successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk menghapus Kriteria
const remove = async (id: number): Promise<{ status: number; message: string }> => {
    try {
        const kriteria = await kriteriaRepository.getById(id);
        if (!kriteria) {
            return { status: 404, message: 'Kriteria not found' };
        }

        await kriteriaRepository.remove(id);
        return { status: 200, message: 'Kriteria removed successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

export { create, list, getById, update, remove };
