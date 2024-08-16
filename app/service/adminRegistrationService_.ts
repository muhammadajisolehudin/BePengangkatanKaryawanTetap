// import bcrypt from "bcrypt";
// import { adminRegistrationRepository } from "../repositories/adminRegistrationRepository";

// // Mendefinisikan tipe User
// interface User {
//   name: string;
//   username: string;
//   password: string;
//   no_hp?:string;
// }


// const registerAdmin = async (body: User) => {
//     const { username, password, name, no_hp } = body;

//     if (!username || !password || !name ) {
//         return { error: 'REQUIRED' };
//     }
//     try {
//         const searchUser = await adminRegistrationRepository.findByUsername(username);
//         if(searchUser){
//             return { error: 'REGISTRED' };
//         }else{
//             const hashedPassword = await bcrypt.hash(password, 10);

//             const user = await adminRegistrationRepository.register({
//                 username,
//                 password: hashedPassword,
//                 name,
//                 no_hp,
//             })

//             return{ status:200, user }
//         }
        
//     } catch (error) {
//         throw error;
//     }
// }

// export {
//     registerAdmin
// }
