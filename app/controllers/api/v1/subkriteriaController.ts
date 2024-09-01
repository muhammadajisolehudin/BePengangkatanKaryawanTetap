import { Request, Response, NextFunction } from 'express';
import * as subkriteriaService from '../../../service/subkriteriaService'; // Menggunakan * as untuk mengimpor semua fungsi dari subkriteriaService

const listSubkriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await subkriteriaService.list();
        if (result.status === 200) {
            // Jika status dari hasil adalah 200, kirimkan respons berhasil
            res.status(200).json({
                status: 'OK',
                data: result.data,
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

const createSubkriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await subkriteriaService.create(req.body);
        res.status(result.status).json({
            status: 'OK',
            data: result.subkriteria,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const updateSubkriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await subkriteriaService.update(Number(req.params.id), req.body);

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

const showSubkriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await subkriteriaService.getById(Number(req.params.id));
        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            data: result.status === 200 ? result.subkriteria : null,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const destroySubkriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await subkriteriaService.remove(Number(req.params.id));

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
    list: listSubkriteria,
    create: createSubkriteria,
    update: updateSubkriteria,
    show: showSubkriteria,
    destroy: destroySubkriteria,
};
