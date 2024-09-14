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
        const result = await managerService.updateValidasiManager(Number(id), validasi_manager);

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
        const result = await managerService.getValidasiManager();

        if (result.status === 200) {
            if (result.status === 200) {
                // Jika status dari hasil adalah 200, proses dan kirimkan respons berhasil
                const formattedData = result.data?.data.map(item => ({
                    id: item.id,
                    karyawan: item.karyawan,
                    validasi_manager: item.validasi_manager
                }));

                res.status(200).json({
                    status: 'OK',
                    data: formattedData,
                    meta: { total: result.data?.count },
                });
            } else {
                // Jika status dari hasil bukan 200, kirimkan respons gagal
                res.status(result.status).json({
                    status: 'FAIL',
                    message: result.message,
                });
            }
            // // Jika status dari hasil adalah 200, kirimkan respons berhasil
            // res.status(200).json({
            //     status: 'OK',
            //     data: result.data?.data,
            //     meta: { total: result.data?.count },
            // });
        } else {
            // Jika status dari hasil bukan 200, kirimkan respons gagal
            res.status(result.status).json({
                status: 'FAIL',
                message: result.message,
            });
        }
    } catch (err) {
        // Tangani kesalahan jika terjadi
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};


const getValidasiManagerStatusById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Mendapatkan ID dari parameter
        const id = Number(req.params.id);

        // Panggil fungsi untuk mendapatkan perangkingan berdasarkan ID
        const perangkingan = await managerService.getValidasiManagerById(id);

        if (!perangkingan) {
            res.status(404).json({
                status: 'FAIL',
                message: `Perangkingan with id ${id} not found`,
            });
            return;
        }

        // Ekstrak data yang diperlukan
        const responseData = {
            id: perangkingan.id,
            karyawan: perangkingan.karyawan,
            validasi_manager: perangkingan.validasi_manager,
        };

        res.status(200).json({
            status: 'OK',
            data: responseData,
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
    getValidasiManagerStatusById,
};
