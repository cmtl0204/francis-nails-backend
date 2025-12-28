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

@Entity('invoice_items', { schema: 'core' })
export class InvoiceItemEntity {
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
    name: 'invoice_id',
    type: 'uuid',
    comment: 'ID de la factura',
  })
  invoiceId: string;

  @Column({
    name: 'staff_id',
    type: 'uuid',
    nullable: true,
    comment: 'ID del empleado que realizo el servicio',
  })
  staffId: string;

  @Column({
    name: 'model_type',
    type: 'varchar',
    comment: 'Tipo de modelo (service, product, other)',
  })
  modelType: string;

  @Column({
    name: 'model_id',
    type: 'uuid',
    nullable: true,
    comment: 'ID del modelo relacionado',
  })
  modelId: string;

  @Column({
    name: 'description',
    type: 'varchar',
    comment: 'Descripcion del item',
  })
  description: string;

  @Column({
    name: 'quantity',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Cantidad del item',
  })
  quantity: number;

  @Column({
    name: 'unit_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio unitario del item',
  })
  unitPrice: number;

  @Column({
    name: 'discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Descuento aplicado al item',
  })
  discount: number;

  @Column({
    name: 'tax',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Impuesto del item',
  })
  tax: number;

  @Column({
    name: 'total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Total del item',
  })
  total: number;
}