import { Model, ModelObject } from 'objection';
import { KaryawanModel } from './karyawan';

export interface Perangkingan {
    id: number;
    karyawan: number;
    nilai_perangkingan: number;
    keputusan_diangkat: boolean;
    validasi_manager: boolean;
    created_at: Date;
    updated_at: Date;
}

export class PerangkinganModel extends Model implements Perangkingan {
    id!: number;
    karyawan!: number;
    nilai_perangkingan!: number;
    keputusan_diangkat!: boolean;
    validasi_manager!: boolean;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return 'perangkingans'; // Nama tabel sesuai migrasi
    }

    // Definisikan relasi dengan model lain
    static get relationMappings() {
        return {
            karyawan: {
                relation: Model.BelongsToOneRelation,
                modelClass: KaryawanModel,
                join: {
                    from: 'perangkingans.karyawan',
                    to: 'karyawans.id'
                }
            },
            // Jika Anda memiliki model relasi lain yang relevan, tambahkan di sini
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

// Tipe ModelObject untuk PerangkinganModel
export type Perangkingans = ModelObject<PerangkinganModel>;
