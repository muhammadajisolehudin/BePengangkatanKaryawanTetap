import { Model } from "objection";
import { KriteriaModel } from "./kriteria";

export interface Subkriteria {
    id: number;
    nama_subkriteria: string;
    bobot_subkriteria: number;
    kriteria: number;
    created_at: Date;
    updated_at: Date;
}

export class SubkriteriaModel extends Model implements Subkriteria {
    id!: number;
    nama_subkriteria!: string;
    bobot_subkriteria!: number;
    kriteria!: number;
    created_at!: Date;
    updated_at!: Date;

    static get tableName() {
        return "subkriterias";
    }

    static get relationMappings() {
        return {
            kriteriaRelation: {
                relation: Model.BelongsToOneRelation,
                modelClass: KriteriaModel,
                join: {
                    from: 'subkriterias.kriteria',
                    to: 'kriterias.id'
                }
            }
        };
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
