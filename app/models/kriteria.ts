import { Model, ModelObject } from 'objection';

export interface Kriteria {
  id: number; // 'id' adalah tipe number sesuai dengan auto-increment
  nama_kriteria: string;
  bobot_presentase: number; // Ditambahkan sesuai dengan migrasi
  bobot_kriteria: number; // 'float' dalam migrasi diterjemahkan sebagai 'number' di TypeScript
  created_at: Date;
  updated_at: Date;
}

export class KriteriaModel extends Model implements Kriteria {
  id!: number; // 'id' harus sesuai dengan tipe data auto-increment
  nama_kriteria!: string;
  bobot_presentase!: number; // Ditambahkan
  bobot_kriteria!: number;
  created_at!: Date;
  updated_at!: Date;

  static get tableName() {
    return 'kriterias'; // Nama tabel sesuai migrasi
  }

  // Metode-metode hooks sebelum insert dan update
  $beforeInsert() {
    this.created_at = new Date(); // Set timestamp saat insert
    this.updated_at = new Date(); // Set timestamp saat insert
  }

  $beforeUpdate() {
    this.updated_at = new Date(); // Set timestamp saat update
  }
}

// Tipe ModelObject untuk KriteriaModel
export type Kriterias = ModelObject<KriteriaModel>;
