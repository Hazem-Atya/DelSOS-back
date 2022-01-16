import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';

@Module({
  providers: [CrudService],
  exports: [CrudService]
})
export class UtilsModule {}
