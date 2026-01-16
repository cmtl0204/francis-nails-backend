import { ServicesController } from "./services.controller";
import { BranchController } from "./branch.controller";
import { AppointmentServiceController } from './appointment-service.controller';
import { InventoryMovementController } from './inventory-movement.controller';
import { InvoiceItemController } from './invoice-item.controller';
import { InvoiceController } from './invoice.controller';
import { ProductController } from './product.controller';
import { PurchaseItemController } from './purchase-item.controller';
import { PurchaseController } from './purchase.controller';
import { StockBalanceController } from './stock-balance.controller';
import { SupplierController } from './supplier.controller';
import { CustomersController } from './customers.controller';
import { StaffProfilesController } from './staff-profiles.controller';
import { StaffTimeOffController } from './staff-time-off.controller';
import { StaffWorkingHourController } from './staff-working-hours.controller';
import { AppointmentsController } from './appointments.controller';

export const controllers = [

  BranchController,
  AppointmentServiceController,
  ProductController,
  StockBalanceController,
  SupplierController,
  PurchaseController,
  PurchaseItemController,
  InventoryMovementController,
  InvoiceController,
  InvoiceItemController,
  CustomersController,
  StaffProfilesController,
  StaffWorkingHourController,
  StaffTimeOffController,
  AppointmentsController,
  ServicesController

];
