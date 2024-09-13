import { NextFunction, Request, Response } from "express";
import * as AuthService from "../../../service/authService"; // Pastikan path file-nya sudah sesuai


const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await AuthService.login(req.body);
        

        if (result.user && result.token) {
            const karyawan = await AuthService.getByUserId(result.user.id);
            res.status(200).json({ 
                status:"OK",
                message: "Login successful", 
                // user: result.user, 
                data: {
                    user: result.user,
                    karyawan,
                    // username: karyawan.username,
                    // role: karyawan.role
                },
                token: result.token 
            });
        }  else if (result.error === 'INVALID_PASSWORD') {
            res.status(401).json({ 
                status: "FAIL",
                message: "Invalid username or password" 
            });
        } else {
            res.status(401).json({
                status: "FAIL", 
                message: "user is not registered" 
            });
        } 
    } catch (error) {
        res.status(500).json({
            status: "ERROR", 
            message: "Internal server error" 
        });
    }
};

// const registerUser = async (req:Request, res:Response, next: NextFunction): Promise<void> => {
//     try {
//         const result = await AuthService.register(req.body)
//         if (result.status === 200 && result.user) {
//             res.status(200).json({ 
//                 status: "OK", 
//                 message: "member has been successfully registered", 
//                 user: result.user 
//             });
//         }  else if (result.error === 'REQUIRED') {
//             res.status(401).json({ 
//                 status:"FAIL", 
//                 message: "all files are required" 
//             });
//         } else {
//             res.status(401).json({ 
//                 status:"FAIL", 
//                 message: "username has been registered" 
//             });
//         } 
//     } catch (error) {
//         res.status(500).json({ 
//             status: "ERROR", 
//             message: "Internal server error" 
//         });
//     }
// }
export default {
  login: loginUser,
//   register:registerUser
};
