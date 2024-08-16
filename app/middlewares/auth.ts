import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AkunModel } from '../models/akun'; 

const { JWT_SECRET_KEY = 'secret' } = process.env;

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

interface JwtPayload {
  id: string;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

// const auth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { authorization } = req.headers;

//     if (!authorization) {
//       return res.status(401).json({
//         status: false,
//         message: 'Invalid Token',
//       });
//     }

//     const token = authorization.split(' ')[1];
//     const data = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

//     const user = await UserModel.query().findById(data.id);
//     if (!user) {
//       return res.status(401).json({
//         status: false,
//         message: 'User not found',
//       });
//     }

//     req.user = {
//       id: user.id,
//       role: user.role,
//     };

//      req.user = {
//       id: user.id,
//       role: user.role,
//     }

//     next();
    
//   } catch (error: any) {
//     res.status(500).json({
//       status: false,
//       message: 'Internal Server Error',
//     });
//   }
// };

const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: 'Invalid Token',
      });
    }

    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

    const user = await AkunModel.query().findById(data.id);
    if (!user) {
      return res.status(401).json({
        status: false,
        message: 'User not found',
      });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
}

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      status: false,
      message: 'No user information',
    });
  }
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({
      status: false,
      message: 'Forbidden',
    });
  }
  
  next();
};

const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(403).json({
      status: false,
      message: 'No user information',
    });
  }
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({
      status: false,
      message: 'Forbidden',
    });
  }
  next();
};

export { auth, isAdmin, isSuperAdmin };
