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
import { UserEntity } from '@auth/entities';
import { RucEntity } from '@modules/core/entities/ruc.entity';
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
  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  @Column({
    type: 'uuid',
    name: 'user_id',
    nullable: true,
    comment: '',
  })
  userId: string;

  @ManyToOne(() => RucEntity, { nullable: true })
  @JoinColumn({ name: 'ruc_id' })
  ruc: RucEntity;
  @Column({
    type: 'uuid',
    name: 'ruc_id',
    nullable: true,
    comment: '',
  })
  rucId: string;

  @ManyToOne(() => CatalogueEntity)
  @JoinColumn({ name: 'payments_methods_id' })
  payment_methods: CatalogueEntity;
  @Column({
    type: 'uuid',
    name: 'payments_methods_id',
    comment: '',
  })
  paymentsMethodId: string;

  @ManyToOne(() => InvoiceEntity, {nullable:true})
  @JoinColumn({ name: 'invoice_id' })
  invoice: InvoiceEntity;
  @Column({
    type: 'uuid',
    name: 'invoice_id',
    nullable: true,
    comment: '',
  })
  invoiceId: string;

  /** Columns **/
  @Column({
    name: 'registered_at',
    type: 'timestamp',
    nullable: true,
    comment: 'Numero de RUC',
  })
  registeredAt: Date;

  @Column({
    name: 'has_debt',
    type: 'boolean',
    comment: 'true=tiene deuda;false=no tiende deuda',
  })
  hasDebt: boolean;

  @Column({
    name: 'id_temp',
    type: 'bigint',
    comment: 'Codigo de la tabla migrada',
  })
  idTemp: number;
}
