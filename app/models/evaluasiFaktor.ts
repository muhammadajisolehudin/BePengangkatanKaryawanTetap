import { Model, ModelObject } from 'objection';

export interface EvaluasiFaktor {
    id?: number; // 'id' adalah tipe number sesuai dengan auto-increment
    bobot_kriteria: number;
    bobot_subkriteria: number; 
    hasil_evaluasi_faktor: number; 
    created_at?: Date;
    updated_at?: Date;
}

export class EvaluasiFaktorModel extends Model implements EvaluasiFaktor {
    id?: number; 
    bobot_kriteria!: number;
    bobot_subkriteria!: number;
    hasil_evaluasi_faktor!: number; 
    created_at?: Date;
    updated_at?: Date;

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
