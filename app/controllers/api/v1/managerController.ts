import { Request, Response, NextFunction } from 'express';
import * as managerService from '../../../service/managerService';

const updateValidasiManager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const { validasi_manager } = req.body;

        // Validasi input
        if (typeof validasi_manager !== 'boolean') {
            res.status(400).json({
                status: 'FAIL',
                message: 'Invalid manager status value. It should be a boolean.',
            });
            return;
        }

        // Panggil fungsi untuk memperbarui status manager
        const result = await managerService.updateManagerStatus(Number(id), validasi_manager);

        if (result.status === 200) {
            res.status(200).json({
                status: 'OK',
                data: result.perhitungan,
                message: result.message,
            });
        } else {
            res.status(result.status).json({
                status: 'FAIL',
                message: result.message,
            });
        }
    } catch (err) {
        // Tangani kesalahan
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};


const getValidasiManagerStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // const { id } = req.params.id;

        // Panggil fungsi untuk mendapatkan perangkingan berdasarkan ID
        const perangkingan = await managerService.getManagerStatus(Number(req.params.id));

        if (!perangkingan) {
            res.status(404).json({
                status: 'FAIL',
                message: `Perangkingan with id ${req.params.id} not found`,
            });
            return;
        }

        res.status(200).json({
            status: 'OK',
            data: perangkingan,
        });
    } catch (err) {
        // Tangani kesalahan
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};
export default {
    updateValidasiManager,
    getValidasiManagerStatus,
};
