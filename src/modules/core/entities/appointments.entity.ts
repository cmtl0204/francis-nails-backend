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
import { BranchEntity } from './branch.entity';
import { CustomerEntity } from './customers.entity';
import { StaffProfileEntity } from './staff_profiles.entity';

@Entity('appointments', { schema: 'core' })
export class AppointmentEntity {
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

  @ManyToOne(()=>BranchEntity, )
  @JoinColumn({name: 'branch_id'})
  branch: BranchEntity;

  @Column({
    type: 'uuid',
    name: 'branch_id',
    comment: ''
  })
  branchId: string

  @ManyToOne(()=>CustomerEntity)
  @JoinColumn({name: 'custom_id'})
  custom: CustomerEntity;

  @Column({
    type: 'uuid',
    name: 'custom_id',
    comment: ''
  })
  customId: string


  @ManyToOne(()=>StaffProfileEntity)
  @JoinColumn({name: 'staff_profile_id'})
  staff_profile: StaffProfileEntity;
  
  @Column({
    type: 'uuid',
    name: 'staff_profile_id',
    comment: ''
    })
  staffProfileId: string

  
  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'statuses_id' })
  statuses: CatalogueEntity;
  @Column({
    type: 'uuid',
    name: 'statuses_id',
    comment: ''
  })
  statusesId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'sources_id' })
  sources: CatalogueEntity;
  @Column({
    type: 'uuid',
    name: 'sources_id',
    comment: ''
  })
  sourcesID: string;





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
  name: 'notes',
  type: 'text',
  nullable: true,
  comment: 'Notas adicionales',
})
notes: string;

}
