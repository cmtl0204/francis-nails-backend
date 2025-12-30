import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { ClassificationEntity } from '@modules/core/entities/classification.entity';
import { StaffWorkingHourEntity, } from './staff_working_hours.entity';
import { StaffTimeOffEntity } from './staff_time_off.entity';
import { AppointmentEntity } from './appointments.entity';
import { UserEntity } from '@auth/entities';


@Entity('staff_profiles', { schema: 'core' })
export class StaffProfileEntity {
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

  @OneToMany(()=> StaffWorkingHourEntity, (working)=> working.staff_profile)
  staff_workings: StaffWorkingHourEntity[];

  @OneToMany(()=> StaffTimeOffEntity, (time)=> time.staff_profile)
  staff_times: StaffTimeOffEntity[];

  @OneToMany(()=> AppointmentEntity, (appointment)=> appointment.staff_profile)
  appointments: AppointmentEntity[]




  
  /** Foreign Keys **/


    @OneToOne (()=>UserEntity,(user)=> user.staff_profile)
    @JoinColumn({ name: 'staff_profile_id'})
    user: UserEntity;
    @Column({
      type: 'uuid',
      name: 'staff_profile_id',
      comment: ''
    })
    staffProfileId: string


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
