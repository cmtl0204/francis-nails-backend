import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvoiceEntity } from './invoice.entity';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

@Entity('payments', { schema: 'core' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de creación del registro',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_timestampP',
    comment: 'Fecha de actualización del registro',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de eliminación del registro',
  })
  deletedAt: Date;

  @Column({
    name: 'enabled',
    type: 'boolean',
    default: true,
    comment: 'true=visible, false=no visible',
  })
  enabled: boolean;

  /** Foreign Keys **/
  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.payment)
  @JoinColumn({ name: 'invoice_id' })
  invoice: InvoiceEntity;

  @Column({
    type: 'uuid',
    name: 'invoice_id',
    comment: 'Referencia a la factura'
  })
  invoiceId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'method_id' })
  method: CatalogueEntity;

  @Column({
    type: 'uuid',
    name: 'method_id',
    comment: 'Referencia al método de pago (catálogo)'
  })
  methodId: string;

  /** Columns **/
  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    comment: 'Monto del pago',
  })
  amount: number;

  @Column({
    name: 'paid_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Fecha y hora en que se realizó el pago',
  })
  paidAt: Date;

  @Column({
    name: 'reference',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Número de referencia, transferencia o voucher',
  })
  reference: string;
}