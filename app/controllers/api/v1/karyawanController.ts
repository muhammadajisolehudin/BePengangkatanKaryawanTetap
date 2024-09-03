import { Request, Response, NextFunction } from 'express';
import * as karyawanService from '../../../service/karyawanService'; // Mengimpor semua fungsi dari karyawanService

const listKaryawan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await karyawanService.list();
        if (result.status === 200) {
            res.status(200).json({
                status: 'OK',
                data: result.data?.data,
                meta: { total: result.data?.count },
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

const createKaryawan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await karyawanService.create(req.body);
        res.status(result.status).json({
            status: 'OK',
            data: result.karyawan,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const updateKaryawan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await karyawanService.update(Number(req.params.id), req.body);

        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const showKaryawan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await karyawanService.getById(Number(req.params.id));
        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            data: result.status === 200 ? result.karyawan : null,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const destroyKaryawan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await karyawanService.remove(Number(req.params.id));

        if (result.status === 404) {
            res.status(404).json({
                status: 'FAIL',
                message: result.message,
            });
            return;
        }

        res.status(200).json({
            status: 'OK',
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

export default {
    list: listKaryawan,
    create: createKaryawan,
    update: updateKaryawan,
    show: showKaryawan,
    destroy: destroyKaryawan,
};
