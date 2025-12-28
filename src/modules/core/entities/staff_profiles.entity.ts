import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { ClassificationEntity } from '@modules/core/entities/classification.entity';

@Entity('staff_profiles', { schema: 'core' })
export class staffProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de creacion del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de actualizacion de la ultima actualizacion del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminacion del registro',
  })
  deletedAt: Date;

  @Column({
    name: 'enabled',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  enabled: boolean;

  /** Inverse Relationship **/
  
  /** Foreign Keys **/

  /** Columns **/
@Column({
  name: 'position_id',
  type: 'varchar',
  comment: 'ID del catálogo de posiciones (FK)',
})
positionId: string;

@Column({
  name: 'photo_url',
  type: 'varchar',
  nullable: true,
  comment: 'URL de la foto del colaborador',
})
photoUrl: string;

@Column({
  name: 'display_name',
  type: 'varchar',
  comment: 'Nombre a mostrar en agenda (ej: Majo, Katy)',
})
displayName: string;

@Column({
  name: 'specialty',
  type: 'varchar',
  comment: 'Especialidad: uñas, cejas, pestañas, etc.',
})
specialty: string;

@Column({
  name: 'color_tag',
  type: 'varchar',
  comment: 'Color identificador para la agenda',
})
colorTag: string;

@Column({
  name: 'commission_type',
  type: 'varchar',
  comment: 'Tipo de comisión: percent | fixed | none',
})
commissionType: string;

@Column({
  name: 'commission_value',
  type: 'decimal',
  precision: 10,
  scale: 2,
  nullable: true,
  comment: 'Valor de la comisión según el tipo',
})
commissionValue: number;

}
