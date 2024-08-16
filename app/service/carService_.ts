// import path from 'path';
// import { carsRepository } from '../repositories/carsRepository';

// interface Car {
//   id: string;
//   plate: string;
//   manufacture: string;
//   model: string;
//   img?: string;
//   price: number;
//   capacity: number;
//   transmission: 'manual' | 'automatic' | 'cvt' | 'dct' | 'wet_clutch';
//   year: number;
//   type?: string;
//   driver_type: 'lepas kunci' | 'dengan supir';
//   available: boolean;
//   available_at?: string;
//   description?: string;
//   create_by: string;
//   update_by: string;
//   created_at: Date;
//   updated_at: Date;
// }

// interface ListResult {
//   data: Car[];
//   count: number;
// }

// const create = async (body: Car, img: string, userId: string) => {
//   try {
//     const url = `/uploads/${path.basename(img)}`
//     const newCar: Car = {
//       ...body,
//       img: url,
//       create_by: userId,
//       update_by: userId,
//       // available: true, // default value
//       // created_at: new Date(), // set current date
//       // updated_at: new Date()  // set current date
//     };
  
//     const createdCar = await carsRepository.create(newCar);
//     return { status: 200, message: 'Car created successfully', car: createdCar };

//   } catch (error: any) {
//     return { status: 400, message: `Validation error: ${error.message}` };
//   }
// };

// const list = async (): Promise<{ status: number; data?: ListResult; message?: string }> => {
//   try {
//     const data = await carsRepository.list();
//     return { status: 200, data: { data, count: data.length } };
//   } catch (error: any) {
//     return { status: 500, message: `Internal server error: ${error.message}` };
//   }
// };

// const getById = async (id: string): Promise<{ status: number; message: string; car?: Car }> => {
//   try {
//     const car = await carsRepository.getById(id);
//     if (!car) {
//       return { status: 404, message: `Car with id ${id} not found` };
//     }
//     return { status: 200, message: 'The car was found', car };

//   } catch (error: any) {
//     return { status: 500, message: `Internal server error: ${error.message}` };
//   }
// };

// const update = async (id: string, body: Car, img: any, userId: string): Promise<{ status: number; message: string }> => {
//   try {
//     const car = await carsRepository.getById(id);
//     if (!car) {
//       return { status: 404, message: `Car with id ${id} not found` };
//     }
//     const url = `/uploads/${path.basename(img)}`
//     const updatedCar: Car = {
//       ...body,
//       img: url,
//       update_by: userId,
//       updated_at: new Date() // set current date
//     };

//     await carsRepository.update(id, updatedCar);
//     return { status: 200, message: 'Car updated successfully' };

//   } catch (error: any) {
//     return { status: 500, message: `Internal server error: ${error.message}` };
//   }
// };

// const remove = async (id: string): Promise<{ status: number; message: string }> => {
//   try {
//     const car = await carsRepository.getById(id);
//     if (!car) {
//       return { status: 404, message: 'Car not found' };
//     }

//     await carsRepository.remove(id);
//     return { status: 200, message: 'Car removed successfully' };

//   } catch (error: any) {
//     return { status: 500, message: `Internal server error: ${error.message}` };
//   }
// };

// export { 
//   create, 
//   list, 
//   getById, 
//   update, 
//   remove 
// };
