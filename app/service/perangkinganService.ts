import { perangkinganRepository } from '../repositories/perangkinganRepository'; // Pastikan jalur ini sesuai dengan struktur proyek Anda
import { perhitunganRepository } from '../repositories/perhitunganRepository';

interface Perangkingan {
    id: number; // 'id' sesuai dengan auto-increment
    karyawan: number;
    nilai_perangkingan: number;
    keputusan_diangkat: boolean;
    validasi_manager: boolean;
    created_at: Date;
    updated_at: Date;
}


// Fungsi untuk mendapatkan daftar Perangkingan
const list = async (): Promise<{ status: number; data?: { data: Perangkingan[]; count: number }; message?: string }> => {
    try {
        const data = await perangkinganRepository.list();
        return { status: 200, data: { data, count: data.length } };
    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk mendapatkan Perangkingan berdasarkan ID
const getById = async (id: number): Promise<{ status: number; message: string; perangkingan?: Perangkingan }> => {
    try {
        const perangkingan = await perangkinganRepository.getById(id);
        if (!perangkingan) {
            return { status: 404, message: `Perangkingan with id ${id} not found` };
        }
        return { status: 200, message: 'The perangkingan was found', perangkingan };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

// Fungsi untuk memperbarui Perangkingan
const updatePerankingan = async (karyawanId: number): Promise<void> => {
    console.log(`Memperbarui perankingan untuk karyawanId: ${karyawanId}`);
    try {
        // Ambil semua perhitungan untuk karyawan tertentu
        const perhitunganList = await perhitunganRepository.getByKaryawanId(karyawanId);

        if (perhitunganList.length === 0) {
            console.log(`Tidak ada perhitungan ditemukan untuk karyawanId: ${karyawanId}`);
            return;
        }

        // Validasi data dan hitung total skor
        let totalScore = 0;
        perhitunganList.forEach(data => {
            // Log tipe dan nilai untuk debugging
            console.log(`Memproses hasil_perhitungan: ${data.hasil_perhitungan}, tipe: ${typeof data.hasil_perhitungan}`);

            // Konversi hasil_perhitungan ke number jika berupa string
            const hasilPerhitungan = typeof data.hasil_perhitungan === 'string'
                ? parseFloat(data.hasil_perhitungan)
                : data.hasil_perhitungan;

            if (!isNaN(hasilPerhitungan)) {
                totalScore += hasilPerhitungan;
            } else {
                console.error(`Data tidak valid: hasil_perhitungan bukan angka untuk entri`, data);
            }
        });

        if (isNaN(totalScore)) {
            console.error('TotalScore yang dihitung adalah NaN');
            return;
        }

        const formattedTotalScore = parseFloat(totalScore.toFixed(2));

        const keputusanDiangkat = formattedTotalScore > 0.6;

        // Cek apakah ada entri ranking untuk karyawan ini
        const existingRanking = await perangkinganRepository.getByKaryawanId(karyawanId);

        if (existingRanking) {
            // Jika sudah ada, perbarui nilai_perangkingan
            await perangkinganRepository.update(existingRanking.id, { nilai_perangkingan: formattedTotalScore });
            console.log(`Memperbarui perankingan yang ada untuk karyawanId: ${karyawanId}`);
        } else {
            // Jika belum ada, buat entri baru
            await perangkinganRepository.create({ karyawan: karyawanId, nilai_perangkingan: formattedTotalScore, keputusan_diangkat: keputusanDiangkat, validasi_manager: false });
            console.log(`Membuat perankingan baru untuk karyawanId: ${karyawanId}`);
        }
    } catch (error: any) {
        console.error(`Kesalahan saat memperbarui perankingan: ${error.message}`);
    }
};


// Fungsi untuk menghapus Perangkingan
const remove = async (id: number): Promise<{ status: number; message: string }> => {
    try {
        const perangkingan = await perangkinganRepository.getById(id);
        if (!perangkingan) {
            return { status: 404, message: 'Perangkingan not found' };
        }

        await perangkinganRepository.remove(id);
        return { status: 200, message: 'Perangkingan removed successfully' };

    } catch (error: any) {
        return { status: 500, message: `Internal server error: ${error.message}` };
    }
};

export { list, getById, updatePerankingan, remove };
