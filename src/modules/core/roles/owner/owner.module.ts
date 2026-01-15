import { Global, Module } from '@nestjs/common';
import { CatalogueModule } from '@modules/common/catalogue/catalogue.module';
import { FileModule } from '@modules/common/file/file.module';
import { MailModule } from '@modules/common/mail/mail.module';
import { controllers } from '@modules/core/roles/owner/controllers';
import { coreProviders } from '@modules/core/core.provider';
import { SharedCoreModule } from '@modules/core/shared-core/shared-core.module';
import { ReportsModule } from '@modules/reports/reports.module';
import { ServicesService } from './services/services.service';
import { AppointmentServiceService } from './services/appointment-service.service';
import { InventoryMovementService } from './services/inventory-movement.service';
import { InvoiceItemService } from './services/invoice-item.service';
import { InvoiceService } from './services/invoice.service';
import { ProductService } from './services/product.service';
import { PurchaseItemService } from './services/purchase-item.service';
import { PurchaseService } from './services/purchase.service';
import { StockBalanceService } from './services/stock-balance.service';
import { SupplierService } from './services/supplier.service';
import { CustomersService } from './services/customers.service';
import { StaffProfilesService } from './services/staff-profiles.service';
import { StaffWorkingHoursService } from './services/staff-working-hours.service';
import { StaffTimeOffService } from './services/staff-time-off.service';
import { AppointmentsService } from './services/appointments.service';
import { BranchService } from './services/branch.service';

@Global()
@Module({
  imports: [CatalogueModule, FileModule, MailModule, SharedCoreModule, ReportsModule],
  controllers,
  providers: [
  ...coreProviders,
    BranchService,
    AppointmentServiceService,
    ProductService,
    StockBalanceService,
    SupplierService,
    PurchaseService,
    PurchaseItemService,
    InventoryMovementService,
    InvoiceService,
    InvoiceItemService,
    CustomersService,
    StaffProfilesService,
    StaffWorkingHoursService,
    StaffTimeOffService,
    AppointmentsService,
    ServicesService
    
  ],
  exports: [],
})
export class OwnerModule {}
