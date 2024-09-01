import { Request, Response, NextFunction } from 'express';
import * as kriteriaService from '../../../service/kriteriaService'; // Menggunakan * as untuk mengimpor semua fungsi dari kriteriaService

const listKriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await kriteriaService.list();
        if (result.status === 200) {
            // Jika status dari hasil adalah 200, kirimkan respons berhasil
            res.status(200).json({
                status: 'OK',
                data: result.data?.data,
                meta: { total: result.data?.count },
            });
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

const createKriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await kriteriaService.create(req.body);
        res.status(result.status).json({
            status: 'OK',
            data: result.kriteria,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const updateKriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await kriteriaService.update(Number(req.params.id), req.body);

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

const showKriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await kriteriaService.getById(Number(req.params.id));
        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            data: result.status === 200 ? result.kriteria : null,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const destroyKriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await kriteriaService.remove(Number(req.params.id));

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
    list: listKriteria,
    create: createKriteria,
    update: updateKriteria,
    show: showKriteria,
    destroy: destroyKriteria,
};
