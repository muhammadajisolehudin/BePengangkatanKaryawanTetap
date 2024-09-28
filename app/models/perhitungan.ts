import { Model, ModelObject } from 'objection';
import { KaryawanModel } from './karyawan';
import { EvaluasiFaktorModel } from './evaluasiFaktor';
import { KriteriaModel } from './kriteria';
import { SubkriteriaModel } from './subkriteria';

export interface Perhitungan {
    id: number;
    karyawan: number;
    hasil_evaluasi_faktor: number;
    kriteria: number;
    // subkriteria: number;
    hasil_perhitungan: number;
    created_at: Date;
    updated_at: Date;
}

export class PerhitunganModel extends Model implements Perhitungan {
    id!: number;
    karyawan!: number;
    hasil_evaluasi_faktor!: number;
    kriteria!: number;
    // subkriteria!: number;
    hasil_perhitungan!: number;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'perhitungans'; // Nama tabel sesuai migrasi
    }

    // Definisikan relasi dengan model lain
    static get relationMappings() {
        return {
            karyawanRelation: {
                relation: Model.BelongsToOneRelation,
                modelClass: KaryawanModel,
                join: {
                    from: 'perhitungans.karyawan',
                    to: 'karyawans.id' 
                }
            },
            hasilEvaluasiFaktor: {
                relation: Model.BelongsToOneRelation,
                modelClass: EvaluasiFaktorModel,
                join: {
                    from: 'perhitungans.hasil_evaluasi_faktor', 
                    to: 'evaluasi_faktors.id'
                }
            },
            kriteriaRelation: { 
                relation: Model.BelongsToOneRelation,
                modelClass: KriteriaModel,
                join: {
                    from: 'perhitungans.kriteria', 
                    to: 'kriterias.id' 
                }
            },
            // subkriteriaRelation: { 
            //     relation: Model.BelongsToOneRelation,
            //     modelClass: SubkriteriaModel,
            //     join: {
            //         from: 'perhitungans.subkriteria', 
            //         to: 'subkriterias.id' 
            //     }
            // }
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

// Tipe ModelObject untuk PerhitunganModel
export type PerhitunganModelObject = ModelObject<PerhitunganModel>;
