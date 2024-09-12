import { Request, Response, NextFunction } from 'express';
import * as evaluasiFaktorService from '../../../service/evaluasiFaktorService'; // Mengimpor semua fungsi dari evaluasiFaktorService

// Controller untuk mendapatkan daftar EvaluasiFaktor
const listEvaluasiFaktors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await evaluasiFaktorService.list();
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

// Controller untuk membuat EvaluasiFaktor baru
// const createEvaluasiFaktor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const result = await evaluasiFaktorService.create(req.body);
//         res.status(result.status).json({
//             status: 'OK',
//             data: result.evaluasi_faktor,
//             message: result.message,
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'ERROR',
//             message: (err as Error).message,
//         });
//     }
// };

// Controller untuk memperbarui EvaluasiFaktor
// const updateEvaluasiFaktor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const result = await evaluasiFaktorService.update(Number(req.params.id), req.body);
//         res.status(result.status).json({
//             status: result.status === 200 ? 'OK' : 'FAIL',
//             message: result.message,
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'ERROR',
//             message: (err as Error).message,
//         });
//     }
// };

// Controller untuk mendapatkan EvaluasiFaktor berdasarkan ID
const showEvaluasiFaktor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await evaluasiFaktorService.getById(Number(req.params.id));
        res.status(result.status).json({
            status: result.status === 200 ? 'OK' : 'FAIL',
            data: result.status === 200 ? result.evaluasi_faktor : null,
            message: result.message,
        });
    } catch (err) {
        res.status(500).json({
            status: 'ERROR',
            message: (err as Error).message,
        });
    }
};

// Controller untuk menghapus EvaluasiFaktor
// const destroyEvaluasiFaktor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//         const result = await evaluasiFaktorService.remove(Number(req.params.id));
//         if (result.status === 404) {
//             res.status(404).json({
//                 status: 'FAIL',
//                 message: result.message,
//             });
//             return;
//         }
//         res.status(200).json({
//             status: 'OK',
//             message: result.message,
//         });
//     } catch (err) {
//         res.status(500).json({
//             status: 'ERROR',
//             message: (err as Error).message,
//         });
//     }
// };

export default {
    list: listEvaluasiFaktors,
    // create: createEvaluasiFaktor,
    // update: updateEvaluasiFaktor,
    show: showEvaluasiFaktor,
    // destroy: destroyEvaluasiFaktor,
};
