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

@Entity('products', { schema: 'core' })
export class ProductEntity {
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
    name: 'category_id',
    type: 'uuid',
    nullable: true,
    comment: 'ID de la categoria del producto',
  })
  categoryId: string;

  @Column({
    name: 'sku',
    type: 'varchar',
    nullable: true,
    comment: 'Codigo SKU del producto',
  })
  sku: string;

  @Column({
    name: 'name',
    type: 'varchar',
    comment: 'Nombre del producto',
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
    comment: 'Descripcion del producto',
  })
  description: string;

  @Column({
    name: 'unit',
    type: 'varchar',
    comment: 'Unidad de medida (ml, g, pieza, etc.)',
  })
  unit: string;

  @Column({
    name: 'cost_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio de costo',
  })
  costPrice: number;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: 'Precio de venta',
  })
  salePrice: number;

  @Column({
    name: 'track_stock',
    type: 'boolean',
    default: true,
    comment: 'true=controla stock, false=no controla stock',
  })
  trackStock: boolean;
}