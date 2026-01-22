import { ServiceController } from './services.controller';
import { BranchController } from './branches.controller';
import { AppointmentServiceController } from './appointment-services.controller';
import { InventoryMovementController } from './inventory-movements.controller';
import { InvoiceItemController } from './invoice-items.controller';
import { InvoiceController } from './invoices.controller';
import { ProductController } from './products.controller';
import { PurchaseItemController } from './purchase-items.controller';
import { PurchaseController } from './purchases.controller';
import { StockBalanceController } from './stock-balances.controller';
import { SupplierController } from './suppliers.controller';
import { CustomerController } from './customers.controller';
import { StaffProfileController } from './staff-profiles.controller';
import { StaffTimeOffController } from './staff-time-off.controller';
import { StaffWorkingHourController } from './staff-working-hours.controller';
import { AppointmentController } from './appointments.controller';
import { PaymentsController } from './payments.controller';

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
  CustomerController,
  StaffProfileController,
  StaffWorkingHourController,
  StaffTimeOffController,
  AppointmentController,
  ServiceController,
  PaymentsController
];
