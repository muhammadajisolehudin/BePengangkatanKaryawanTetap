import { Model, ModelObject } from "objection";

export interface Akun {
  username: any;
  role: any;
  id: string;
  password: string;
  no_hp?: string;
  created_at: Date;
  updated_at: Date;
}

export class AkunModel extends Model implements Akun {
  id!: string;
  role!: string;
  username!: string;
  password!: string;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "akuns";
  }

  $beforeInsert() {
    // this.id = uuidv4();
    this.created_at = new Date();
    this.updated_at = new Date();
    if (!this.role) {
      this.role = 'karyawan';
    }
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

export type Akuns = ModelObject<AkunModel>;
