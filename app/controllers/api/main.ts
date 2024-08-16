import { Request, Response, NextFunction } from 'express';

const onLost = (req: Request, res: Response): void => {
  res.status(404).json({
    status: 'FAIL',
    message: 'Route not found!',
  });
};

const onError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  res.status(500).json({
    status: 'ERROR',
    error: {
      name: err.name,
      message: err.message,
    },
  });
};

export {
  onLost,
  onError,
};
