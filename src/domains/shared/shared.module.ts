import { Module } from '@nestjs/common';

import * as Modules from './modules';

@Module({
  imports: [...Object.values(Modules)],
  controllers: [],
  exports: [...Object.values(Modules)],
  providers: [],
})
export class SharedModule {}
