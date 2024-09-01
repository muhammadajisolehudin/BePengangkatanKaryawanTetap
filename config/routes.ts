import express, { Request, Response, NextFunction, Router } from 'express';
import * as controllers from '../app/controllers';
import uploadeHandler from '../app/middlewares/uploadeHandler';
import { auth, isAdmin, isSuperAdmin } from '../app/middlewares/auth';
import path from 'path';

const apiRouter: Router = express.Router();

apiRouter.post('/api/v1/login', controllers.api.v1.authController.login);

apiRouter.get('/api/v1/kriteria', controllers.api.v1.kriteriaController.list);
apiRouter.post('/api/v1/kriteria', controllers.api.v1.kriteriaController.create);
apiRouter.put('/api/v1/kriteria/:id', controllers.api.v1.kriteriaController.update);
apiRouter.get('/api/v1/kriteria/:id', controllers.api.v1.kriteriaController.show);
apiRouter.delete('/api/v1/kriteria/:id', controllers.api.v1.kriteriaController.destroy);

apiRouter.get('/api/v1/subkriteria', controllers.api.v1.subkriteriaController.list);
apiRouter.post('/api/v1/subkriteria', controllers.api.v1.subkriteriaController.create);
apiRouter.put('/api/v1/subkriteria/:id', controllers.api.v1.subkriteriaController.update);
apiRouter.get('/api/v1/subkriteria/:id', controllers.api.v1.subkriteriaController.show);
apiRouter.delete('/api/v1/subkriteria/:id', controllers.api.v1.subkriteriaController.destroy);
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
