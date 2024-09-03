import { Model, ModelObject } from 'objection';

export interface EvalusiFaktor {
    id: number; // 'id' adalah tipe number sesuai dengan auto-increment
    kriteria: number;
    subkriteria: number; 
    evaluasi_faktor: number; 
    created_at: Date;
    updated_at: Date;
}

export class EvaluasiFaktorModel extends Model implements EvalusiFaktor {
    id!: number; // 'id' harus sesuai dengan tipe data auto-increment
    kriteria!: number;
    subkriteria!: number;
    evaluasi_faktor!: number; 
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'evaluasi_faktors'; 
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
export type Kriterias = ModelObject<EvaluasiFaktorModel>;
