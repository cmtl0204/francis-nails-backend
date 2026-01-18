import { Global, Module } from '@nestjs/common';
import { CatalogueModule } from '@modules/common/catalogue/catalogue.module';
import { FileModule } from '@modules/common/file/file.module';
import { MailModule } from '@modules/common/mail/mail.module';
import { controllers } from '@modules/core/roles/owner/controllers';
import { coreProviders } from '@modules/core/core.provider';
import { SharedCoreModule } from '@modules/core/shared-core/shared-core.module';
import { ReportsModule } from '@modules/reports/reports.module';
import { ServiceService } from './services/services.service';
import { AppointmentService } from './services/appointments.service';
import { InventoryMovementService } from './services/inventory-movements.service';
import { InvoiceItemService } from './services/invoice-items.service';
import { InvoiceService } from './services/invoices.service';
import { ProductService } from './services/products.service';
import { PurchaseItemService } from './services/purchase-items.service';
import { PurchaseService } from './services/purchases.service';
import { StockBalanceService } from './services/stock-balances.service';
import { SupplierService } from './services/suppliers.service';
import { CustomerService } from './services/customers.service';
import { StaffProfileService } from './services/staff-profiles.service';
import { StaffWorkingHourService } from './services/staff-working-hours.service';
import { StaffTimeOffService } from './services/staff-time-off.service';
import { BranchService } from './services/branches.service';
import { AppointmentServiceService } from '@modules/core/roles/owner/services/appointment-services.service';
import { PaymentsService } from './services/payments.service';

@Global()
@Module({
  imports: [CatalogueModule, FileModule, MailModule, SharedCoreModule, ReportsModule],
  controllers,
  providers: [
    ...coreProviders,
    BranchService,
    AppointmentService,
    AppointmentServiceService,
    ProductService,
    StockBalanceService,
    SupplierService,
    PurchaseService,
    PurchaseItemService,
    InventoryMovementService,
    InvoiceService,
    InvoiceItemService,
    CustomerService,
    StaffProfileService,
    StaffWorkingHourService,
    StaffTimeOffService,
    ServiceService,
    PaymentsService
  ],
  exports: [],
})
export class OwnerModule {}
