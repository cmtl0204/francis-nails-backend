import { Global, Module } from '@nestjs/common';
import { CatalogueModule } from '@modules/common/catalogue/catalogue.module';
import { FileModule } from '@modules/common/file/file.module';
import { MailModule } from '@modules/common/mail/mail.module';
import { controllers } from '@modules/core/roles/external/controllers';
import { coreProviders } from '@modules/core/core.provider';
import { CadastreService } from '@modules/core/roles/external/services/cadastre.service';
import { ProcessAgencyService } from '@modules/core/roles/external/services/process-agency.service';
import { SharedCoreModule } from '@modules/core/shared-core/shared-core.module';
import { ReportsModule } from '@modules/reports/reports.module';
import { EstablishmentService } from '@modules/core/roles/external/services/establishment.service';
import { ProcessParkService } from '@modules/core/roles/external/services/process-park.service';
import { ProcessCtcService } from '@modules/core/roles/external/services/process-ctc.service';
import { ProcessEventService } from '@modules/core/roles/external/services/process-event.service';
import { ProcessFoodDrinkService } from '@modules/core/roles/external/services/process-food-drink.service';
import { ProcessTransportService } from '@modules/core/roles/external/services/process-transport.service';
import { BranchService } from '@modules/core/roles/external/services/branch.service';
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

@Global()
@Module({
  imports: [CatalogueModule, FileModule, MailModule, SharedCoreModule, ReportsModule],
  controllers,
  providers: [
    ...coreProviders,
    CadastreService,
    EstablishmentService,
    ProcessAgencyService,
    ProcessParkService,
    ProcessCtcService,
    ProcessEventService,
    ProcessFoodDrinkService,
    ProcessTransportService,
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
  ],
  exports: [],
})
export class ExternalModule {}
