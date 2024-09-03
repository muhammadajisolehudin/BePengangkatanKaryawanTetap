import { Model, ModelObject } from "objection";
import { AkunModel } from './akun'; // Pastikan path impor benar

export interface Karyawan {
  id: number;
  nip: string;
  nama: string;
  jenis_kelamin: boolean;
  posisi: string;
  akun_id: number;
  created_at: Date;
  updated_at: Date;
}

export class KaryawanModel extends Model implements Karyawan {
  id!: number;
  nip!:string;
  nama!: string;
  jenis_kelamin!: boolean;
  posisi!: string;
  akun_id!: number;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return "karyawans";
  }

  // Definisikan relasi
  static get relationMappings() {
    return {
      akun: {
        relation: Model.BelongsToOneRelation,
        modelClass: AkunModel,
        join: {
          from: 'karyawans.akun_id',
          to: 'akuns.id'
        }
      }
    };
  }

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

// Tipe ModelObject untuk KaryawanModel
export type KaryawanModelObject = ModelObject<KaryawanModel>;
