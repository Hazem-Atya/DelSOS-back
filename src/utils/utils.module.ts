import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule], 
  providers: [CrudService],
  exports: [CrudService]
})
export class UtilsModule {}
