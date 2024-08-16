import { Model, ModelObject } from "objection";

export interface Karyawan {
  id: string;
  nama: string;
  jenis_kelamin:boolean;
  posisi:string;
  akun_id:number;
  created_at: Date;
  updated_at: Date;
}

export class KaryawanModel extends Model implements Karyawan {
  id!: string;
  nama!: string;
  jenis_kelamin!: boolean;
  posisi!:string;
  akun_id!: number;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "karyawans";
  }

  // Metode-metode hooks sebelum insert dan update
  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

// Tipe ModelObject untuk KaryawanModel
export type Karyawans = ModelObject<KaryawanModel>;
