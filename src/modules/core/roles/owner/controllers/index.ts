import { ServiceController } from './services.controller';
import { BranchController } from './branches.controller';
import { AppointmentServicesController } from './appointment-service.controller';
import { InventoryMovementsController } from './inventory-movement.controller';
import { InvoiceItemsController } from './invoice-item.controller';
import { InvoicesController } from './invoice.controller';
import { ProductsController } from './product.controller';
import { PurchaseItemsController } from './purchase-item.controller';
import { PurchasesController } from './purchase.controller';
import { StockBalancesController } from './stock-balance.controller';
import { SuppliersController } from './supplier.controller';
import { CustomerController } from './customers.controller';
import { StaffProfileController } from './staff-profiles.controller';
import { StaffTimeOffController } from './staff-time-off.controller';
import { StaffWorkingHourController } from './staff-working-hours.controller';
import { AppointmentController } from './appointments.controller';

export const controllers = [
  BranchController,
  AppointmentServicesController,
  ProductsController,
  StockBalancesController,
  SuppliersController,
  PurchasesController,
  PurchaseItemsController,
  InventoryMovementsController,
  InvoicesController,
  InvoiceItemsController,
  CustomerController,
  StaffProfileController,
  StaffWorkingHourController,
  StaffTimeOffController,
  AppointmentController,
  ServiceController,
];
