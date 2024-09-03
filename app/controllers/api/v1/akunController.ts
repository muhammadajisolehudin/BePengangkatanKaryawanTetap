import { Request, Response, NextFunction } from 'express';
import * as akunService from '../../../service/akunService'; // Pastikan path ini sesuai dengan struktur proyek Anda

// Fungsi untuk menangani pembuatan akun baru
const createAkun = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            res.status(400).json({
                status: 'FAIL',
                message: 'Username and password are required',
            });
            return;
        }

        const result = await akunService.create(username, password);
        res.status(201).json({
            status: 'OK',
            message: 'Akun created successfully',
            data: { id: result.id },
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

// Fungsi untuk mendapatkan daftar akun
const listAkun = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await akunService.list();
        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            data: result.data,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

// Fungsi untuk mendapatkan akun berdasarkan ID
const showAkun = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await akunService.getById(req.params.id);
        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            data: result.akun,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

// Endpoint untuk memverifikasi password lama
const verifyPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { oldPassword } = req.body;

        const result = await akunService.verifyPassword(id, oldPassword);

        if (result.status === 200) {
            res.status(200).json({
                status: 'OK',
                message: result.message,
            });
        } else {
            res.status(result.status).json({
                status: 'FAIL',
                message: result.message,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

// Endpoint untuk mengubah password
const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        await akunService.changePassword(id, newPassword);
        res.status(200).json({
            status: 'OK',
            message: 'success changed password',
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

// Fungsi untuk menghapus akun
const destroyAkun = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await akunService.remove(req.params.id);
        res.status(200).json({
            status: 'OK',
            message: 'Akun removed successfully',
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

export default {
    list: listAkun,
    show: showAkun,
    verifyPassword,
    changePassword,
    destroy: destroyAkun,
};
