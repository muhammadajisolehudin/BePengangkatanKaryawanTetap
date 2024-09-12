import { Request, Response, NextFunction } from 'express';
import * as perangkinganService from '../../../service/perangkinganService'; // Menggunakan * as untuk mengimpor semua fungsi dari perangkinganService

const listPerangkingan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await perangkinganService.list();
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



const showPerangkingan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await perangkinganService.getById(Number(req.params.id));
        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            data: result.status === 200 ? result.perangkingan : null,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

const destroyPerangkingan = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await perangkinganService.remove(Number(req.params.id));

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
    list: listPerangkingan,
    show: showPerangkingan,
    destroy: destroyPerangkingan,
};
