import express, { Request, Response, NextFunction, Router } from 'express';
import * as controllers from '../app/controllers';
import uploadeHandler from '../app/middlewares/uploadeHandler';
import { auth, manager } from '../app/middlewares/auth';
import path from 'path';

const apiRouter: Router = express.Router();

apiRouter.post('/api/v1/login', controllers.api.v1.authController.login);

apiRouter.get('/api/v1/kriteria', auth, controllers.api.v1.kriteriaController.list);
apiRouter.post('/api/v1/kriteria', auth, controllers.api.v1.kriteriaController.create);
apiRouter.put('/api/v1/kriteria/:id', auth, controllers.api.v1.kriteriaController.update);
apiRouter.get('/api/v1/kriteria/:id', auth, controllers.api.v1.kriteriaController.show);
apiRouter.delete('/api/v1/kriteria/:id', auth, controllers.api.v1.kriteriaController.destroy);

apiRouter.get('/api/v1/subkriteria', auth, controllers.api.v1.subkriteriaController.list);
apiRouter.post('/api/v1/subkriteria', auth, controllers.api.v1.subkriteriaController.create);
apiRouter.put('/api/v1/subkriteria/:id', auth, controllers.api.v1.subkriteriaController.update);
apiRouter.get('/api/v1/subkriteria/:id', auth, controllers.api.v1.subkriteriaController.show);
apiRouter.delete('/api/v1/subkriteria/:id', auth, controllers.api.v1.subkriteriaController.destroy);

apiRouter.get('/api/v1/karyawan', auth, controllers.api.v1.karyawanController.list);
apiRouter.post('/api/v1/karyawan', auth, controllers.api.v1.karyawanController.create);
apiRouter.put('/api/v1/karyawan/:id', auth, controllers.api.v1.karyawanController.update);
apiRouter.get('/api/v1/karyawan/:id', auth, controllers.api.v1.karyawanController.show);
// apiRouter.delete('/api/v1/karyawan/:id', auth, controllers.api.v1.karyawanController.destroy);

apiRouter.get('/api/v1/akun', auth, controllers.api.v1.akunController.list);
apiRouter.post('/api/v1/akun/verify-password/:id', auth, controllers.api.v1.akunController.verifyPassword);
apiRouter.put('/api/v1/akun/change-password/:id', auth, controllers.api.v1.akunController.changePassword);
apiRouter.get('/api/v1/akun/:id', auth, controllers.api.v1.akunController.show);
apiRouter.delete('/api/v1/akun/:id', auth, controllers.api.v1.akunController.destroy);

// data evaluasi faktor 

apiRouter.get('/api/v1/evaluasi-faktor', auth, controllers.api.v1.evaluasiFaktorController.list)
apiRouter.get('/api/v1/evaluasi-faktor/:id', auth, controllers.api.v1.evaluasiFaktorController.show)

apiRouter.post('/api/v1/perhitungan', auth, controllers.api.v1.perhitunganController.create)
apiRouter.get('/api/v1/perhitungan', auth, controllers.api.v1.perhitunganController.list)
apiRouter.get('/api/v1/perhitungan/:id', auth, controllers.api.v1.perhitunganController.show)
apiRouter.delete('/api/v1/perhitungan/:id', auth, controllers.api.v1.perhitunganController.destroy)
apiRouter.put('/api/v1/perhitungan/:id', auth, controllers.api.v1.perhitunganController.update)


apiRouter.get('/api/v1/perankingan', auth, controllers.api.v1.perankinganController.list)
apiRouter.get('/api/v1/perankingan/:id', auth, controllers.api.v1.perankinganController.show)
apiRouter.get('/api/v1/perankingan/karyawan/:karyawanId', auth, controllers.api.v1.perankinganController.showByKaryawanId)
apiRouter.delete('/api/v1/perankingan/:id', auth, controllers.api.v1.perankinganController.destroy)

apiRouter.put('/api/v1/manager/update-validasi-manager/:id', auth, controllers.api.v1.managerController.updateValidasiManager)
apiRouter.get('/api/v1/manager/get-status', auth, controllers.api.v1.managerController.getValidasiManagerStatus)
apiRouter.get('/api/v1/manager/get-status/:id', auth, controllers.api.v1.managerController.getValidasiManagerStatusById)
// Konfigurasi Express untuk menyediakan akses file statis dari direktori uploads
const UPLOAD_DIR = path.join(__dirname, '../uploads');
apiRouter.use('/uploads', express.static(UPLOAD_DIR));

apiRouter.get('/api/v1/errors', (req: Request, res: Response, next: NextFunction) => {
  throw new Error(
    'The Industrial Revolution and its consequences have been a disaster for the human race.'
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

export default apiRouter;
