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

@Entity('inventory_movements', { schema: 'core' })
export class InventoryMovementEntity {
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
    name: 'product_id',
    type: 'uuid',
    comment: 'ID del producto',
  })
  productId: string;

  @Column({
    name: 'location_id',
    type: 'uuid',
    comment: 'ID de la ubicacion de stock',
  })
  locationId: string;

  @Column({
    name: 'model_type',
    type: 'varchar',
    comment: 'Tipo de modelo relacionado (invoices, appointments, purchases, etc.)',
  })
  modelType: string;

  @Column({
    name: 'model_id',
    type: 'uuid',
    comment: 'ID del modelo relacionado',
  })
  modelId: string;

  @Column({
    name: 'type',
    type: 'varchar',
    comment: 'Tipo de movimiento: in|out|adjust',
  })
  type: string;

  @Column({
    name: 'reason',
    type: 'varchar',
    comment: 'Razon del movimiento (purchase, sale, service_use, shrinkage, adjustment)',
  })
  reason: string;

  @Column({
    name: 'quantity',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Cantidad movida',
  })
  quantity: number;
}