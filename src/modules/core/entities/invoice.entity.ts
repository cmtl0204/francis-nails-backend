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

@Entity('invoices', { schema: 'core' })
export class InvoiceEntity {
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
    name: 'customer_id',
    type: 'uuid',
    comment: 'ID del cliente',
  })
  customerId: string;

  @Column({
    name: 'status_id',
    type: 'int',
    comment: 'ID del estado de la factura',
  })
  statusId: number;

  @Column({
    name: 'created_by',
    type: 'uuid',
    comment: 'ID del usuario que creo la factura',
  })
  createdBy: string;

  @Column({
    name: 'invoice_number',
    type: 'varchar',
    comment: 'Numero de factura (serie + secuencial)',
  })
  invoiceNumber: string;

  @Column({
    name: 'issued_at',
    type: 'timestamp',
    comment: 'Fecha y hora de emision de la factura',
  })
  issuedAt: Date;

  @Column({
    name: 'subtotal',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Subtotal de la factura',
  })
  subtotal: number;

  @Column({
    name: 'discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Descuento total de la factura',
  })
  discount: number;

  @Column({
    name: 'tax',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Impuesto de la factura',
  })
  tax: number;

  @Column({
    name: 'total',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Total de la factura',
  })
  total: number;

  @Column({
    name: 'notes',
    type: 'text',
    nullable: true,
    comment: 'Notas adicionales de la factura',
  })
  notes: string;
}