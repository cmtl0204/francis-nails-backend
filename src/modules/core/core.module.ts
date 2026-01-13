import { Global, Module } from '@nestjs/common';
import { coreProviders } from '@modules/core/core.provider';
import { SharedCoreModule } from '@modules/core/shared-core/shared-core.module';
import { OwnerModule } from '@modules/core/roles/owner/owner.module';

@Global()
@Module({
  imports: [SharedCoreModule, OwnerModule],
  providers: [...coreProviders],
})
export class CoreModule {}
