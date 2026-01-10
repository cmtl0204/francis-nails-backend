import { ProcessTransportController } from './process-transport.controller';
import { CadastreController } from './cadastre.controller';
import { ProcessAgencyController } from '@modules/core/roles/external/controllers/process-agency.controller';
import { EstablishmentController } from '@modules/core/roles/external/controllers/establishment.controller';
import { ProcessParkController } from '@modules/core/roles/external/controllers/process-park.controller';
import { ProcessCtcController } from '@modules/core/roles/external/controllers/ctc.controller';
import { ProcessEventController } from '@modules/core/roles/external/controllers/process-event.controller';
import { ProcessFoodDrinkController } from '@modules/core/roles/external/controllers/process-food-drink.controller';
import { BranchController } from './branch.controller';
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
import { StaffWorkingHourEntity } from '@modules/core/entities';
import { StaffTimeOffController } from './staff-time-off.controller';
import { StaffWorkingHoursController } from './staff-working-hours.controller';
import { AppointmentsController } from './appointments.controller';

export const controllers = [
  CadastreController,
  EstablishmentController,
  ProcessAgencyController,
  ProcessTransportController,
  ProcessParkController,
  ProcessCtcController,
  ProcessEventController,
  ProcessFoodDrinkController,
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
  StaffWorkingHoursController,
  StaffTimeOffController,
  AppointmentsController,
];
