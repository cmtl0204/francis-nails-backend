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

@Entity('suppliers', { schema: 'core' })
export class SupplierEntity {
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
    name: 'branch_id',
    type: 'uuid',
    comment: 'ID de la sucursal',
  })
  branchId: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre del proveedor',
  })
  name: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: true,
    comment: 'Telefono del proveedor',
  })
  phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: true,
    comment: 'Correo electronico del proveedor',
  })
  email: string;

  @Column({
    name: 'identification',
    type: 'varchar',
    nullable: true,
    comment: 'Identificacion (RUC, Cedula, etc.)',
  })
  identification: string;

  @Column({
    name: 'address',
    type: 'text',
    nullable: true,
    comment: 'Direccion del proveedor',
  })
  address: string;
}