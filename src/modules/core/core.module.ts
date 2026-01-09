import { Global, Module } from '@nestjs/common';
import { DacModule } from '@modules/core/roles/dac/dac.module';
import { coreProviders } from '@modules/core/core.provider';
import { SharedCoreModule } from '@modules/core/shared-core/shared-core.module';
import { ExternalModule } from '@modules/core/roles/external/external.module';
import { FrancisModule } from './roles/francis/francis.module';

@Global()
@Module({
  imports: [SharedCoreModule, DacModule, ExternalModule, FrancisModule],
  providers: [...coreProviders],
})
export class CoreModule {}
