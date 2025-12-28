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

@Entity('staff_working_hours', { schema: 'core' })
export class staffWorkingHourEntity {
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
  name: 'weekday',
  type: 'int',
  comment: 'Día de la semana: 1=Lunes ... 7=Domingo',
})
weekday: number;

@Column({
  name: 'start_time',
  type: 'time',
  comment: 'Hora de inicio de la jornada',
})
startTime: string;

@Column({
  name: 'end_time',
  type: 'time',
  comment: 'Hora de fin de la jornada',
})
endTime: string;

@Column({
  name: 'break_start',
  type: 'time',
  nullable: true,
  comment: 'Hora de inicio del descanso',
})
breakStart: string;

@Column({
  name: 'break_end',
  type: 'time',
  nullable: true,
  comment: 'Hora de fin del descanso',
})
breakEnd: string;

@Column({
  name: 'is_day_off',
  type: 'boolean',
  default: false,
  comment: 'Indica si es día libre',
})
isDayOff: boolean;

}
