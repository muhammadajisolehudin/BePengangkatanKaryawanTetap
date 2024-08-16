// import { NextFunction, Request, Response } from "express";
// import * as AdminRegistrationService from "../../../service/adminRegistrationService_"; // Pastikan path file-nya sudah sesuai


// const registerAdmin = async (req:Request, res:Response, next: NextFunction): Promise<void> => {
//     try {
//         const result = await AdminRegistrationService.registerAdmin(req.body)
//         if (result.status === 200 && result.user) {
//             res.status(200).json({ 
//                 status: "Ok", 
//                 message: "member has been successfully registered", 
//                 user: result.user 
//             });
//         }  else if (result.error === 'REQUIRED') {
//             res.status(401).json({ 
//                 status:"Fail", 
//                 message: "all files are required" 
//             });
//         } else {
//             res.status(401).json({ 
//                 status:"Fail", 
//                 message: "username has been registered" 
//             });
//         } 
//     } catch (error) {
//         res.status(500).json({ 
//             status: "Fail", 
//             message: "Internal server error" 
//         });
//     }
// }
// export default {
//   register:registerAdmin
// };
