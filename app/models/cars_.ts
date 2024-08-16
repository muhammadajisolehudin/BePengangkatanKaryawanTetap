import { Model } from 'objection';
import { v4 as uuidv4 } from 'uuid';

export interface Car {
  id: string;
  plate: string;
  manufacture: string;
  model: string;
  img?: string;
  price: number;
  capacity: number;
  transmission: 'manual' | 'automatic' | 'cvt' | 'dct' | 'wet_clutch';
  year: number;
  type?: string;
  driver_type: 'lepas kunci' | 'dengan supir';
  available: boolean;
  available_at?: string;
  description?: string;
  create_by: string;
  update_by: string;
  created_at: Date;
  updated_at: Date;
}

export class CarsModel extends Model {
  id!: string;
  plate!: string;
  manufacture!: string;
  model!: string;
  img?: string;
  price!: number;
  capacity!: number;
  transmission!: 'manual' | 'automatic' | 'cvt' | 'dct' | 'wet_clutch';
  year!: number;
  type?: string;
  driver_type!: 'lepas kunci' | 'dengan supir';
  available!: boolean;
  available_at?: string;
  description?: string;
  create_by!: string;
  update_by!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'cars';
  }

  static get relationMappings() {
    const UserModel = require('./user'); // Import your UserModel here

    return {
      createdBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cars.create_by',
          to: 'users.id'
        }
      },
      updatedBy: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'cars.update_by',
          to: 'users.id'
        }
      }
    };
  }

  $beforeInsert() {
    this.id = uuidv4();
    this.available = true;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
