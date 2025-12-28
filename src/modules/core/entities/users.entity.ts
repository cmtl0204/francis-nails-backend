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

@Entity('users', { schema: 'core' })
export class UserEntity {
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
  name: 'full_name',
  type: 'varchar',
  comment: 'Nombre completo del usuario',
})
fullName: string;

@Column({
  name: 'email',
  type: 'varchar',
  unique: true,
  comment: 'Correo electrónico del usuario',
})
email: string;

@Column({
  name: 'phone',
  type: 'varchar',
  comment: 'Número de teléfono del usuario',
})
phone: string;

@Column({
  name: 'password_hash',
  type: 'varchar',
  comment: 'Hash de la contraseña del usuario',
})
passwordHash: string;

@Column({
  name: 'is_active',
  type: 'boolean',
  default: true,
  comment: 'Indica si el usuario está activo',
})
isActive: boolean;

}
