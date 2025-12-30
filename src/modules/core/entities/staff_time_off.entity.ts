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
import { StaffProfileEntity } from './staff_profiles.entity';

@Entity('staff_time_off', { schema: 'core' })
export class StaffTimeOffEntity {
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

    @ManyToOne(()=>StaffProfileEntity)
    @JoinColumn({name: 'staff_profile_id'})
    staff_profile: StaffProfileEntity;
  
    @Column({
      type: 'uuid',
      name: 'staff_profile_id',
      comment: ''
    })
    staffProfileId: string

  /** Columns **/
@Column({
  name: 'start_at',
  type: 'timestamp',
  comment: 'Fecha y hora de inicio',
})
startAt: Date;

@Column({
  name: 'end_at',
  type: 'timestamp',
  comment: 'Fecha y hora de fin',
})
endAt: Date;

@Column({
  name: 'reason',
  type: 'varchar',
  comment: 'Motivo del bloqueo, ausencia o evento',
})
reason: string;

}
