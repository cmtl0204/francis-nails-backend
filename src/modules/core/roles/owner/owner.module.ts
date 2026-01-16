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
import { InventoryMovementsService } from './services/inventory-movements.service';
import { InvoiceItemsService } from './services/invoice-items.service';
import { InvoicesService } from './services/invoices.service';
import { ProductsService } from './services/products.service';
import { PurchaseItemsService } from './services/purchase-items.service';
import { PurchasesService } from './services/purchases.service';
import { StockBalancesService } from './services/stock-balances.service';
import { SuppliersService } from './services/suppliers.service';
import { CustomerService } from './services/customers.service';
import { StaffProfileService } from './services/staff-profiles.service';
import { StaffWorkingHourService } from './services/staff-working-hours.service';
import { StaffTimeOffService } from './services/staff-time-off.service';

import { BranchService } from './services/branches.service';
import { AppointmentServicesService } from '@modules/core/roles/owner/services/appointment-services.service';

@Global()
@Module({
  imports: [CatalogueModule, FileModule, MailModule, SharedCoreModule, ReportsModule],
  controllers,
  providers: [
    ...coreProviders,
    BranchService,
    AppointmentService,
    AppointmentServicesService,
    ProductsService,
    StockBalancesService,
    SuppliersService,
    PurchasesService,
    PurchaseItemsService,
    InventoryMovementsService,
    InvoicesService,
    InvoiceItemsService,
    CustomerService,
    StaffProfileService,
    StaffWorkingHourService,
    StaffTimeOffService,
    ServiceService,
  ],
  exports: [],
})
export class OwnerModule {}
